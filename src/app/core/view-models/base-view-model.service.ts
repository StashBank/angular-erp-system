import { ChangeDetectorRef, Injector } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { LookupDialogComponent, DialogData } from '../lookup-dialog/lookup-dialog.component';
import { DataService } from '../data.service';
import { BaseModel } from '../models/base.model';
import { Observable } from 'rxjs';
import { DataValueType, LookupConfig } from '../decorators/property.decorator';

export abstract class BaseViewModel {

  public form: FormGroup;
  public id: string;

  protected dataService: DataService<BaseModel>;
  protected mobileQuery: MediaQueryList;
  protected translate: TranslateService;
  protected formBuilder: FormBuilder;
  protected route: ActivatedRoute;
  protected router: Router;
  protected location: Location;
  protected dialog: MatDialog;

  protected entity: BaseModel;
  protected entitySchemaName: string;

  private mobileQueryListener: (ev: MediaQueryListEvent) => void;

  public get isMobile(): boolean {
    return this.mobileQuery && this.mobileQuery.matches;
  }

  abstract get subTitle$(): Observable<string>;

  protected collectionName(): string {
    return this.entity.getModelDescriptor().name;
  }

  constructor(
    private injector: Injector
  ) {
    this.setUpDeps();

    const changeDetectorRef = this.injector.get(ChangeDetectorRef);
    const media = this.injector.get(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = _ => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  public init() {
    this.entity = this.createEntity(this.entitySchemaName);
    this.createForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadEntity(id);
      }
    });
  }

  protected createEntity(entitySchemaName: string): BaseModel {
    const models = Reflect.getMetadata('models', Object.prototype) as Array<any>;
    const model = models.find(x => x.name === entitySchemaName);
    const entity = Object.create(model.ctor.prototype);
    return entity as BaseModel;
  }

  protected setEntityColumnsValues(entity: BaseModel, values) {
    if (!entity || !values) {
      return;
    }
    const columnNames = Object.keys(values);
    columnNames.forEach(key => {
      const value = values[key];
      const propertyMetaData = entity.getPropertyDescriptor(key);
      if (propertyMetaData) {
        const valueType = propertyMetaData.dataValueType;
        if (valueType === DataValueType.Lookup || valueType === DataValueType.DropDown) {
          const lookupConfig = propertyMetaData.dataValueTypeConfig as LookupConfig;
          const refSchemaName = lookupConfig && lookupConfig.refModel && lookupConfig.refModel.name;
          if (refSchemaName) {
            const refEntity = this.createEntity(refSchemaName);
            this.setEntityColumnsValues(refEntity, value);
            entity[key] = refEntity;
          } else {
            entity[key] = value;
          }
        } else {
          entity[key] = value;
        }
      }
    });
  }

  protected createForm() {
    const formGroupConfig = this.entity.getModelProperties()
    .reduce((config, propertyName) => {
      const propertyDescriptor = this.entity.getPropertyDescriptor(propertyName);
      const validators = propertyDescriptor && propertyDescriptor.validators || [];
      if (propertyDescriptor && propertyDescriptor.required) {
        validators.push(Validators.required);
      }
      config[propertyName] = [propertyDescriptor && propertyDescriptor.defaultValue, validators];
      return config;
    }, {});
    this.form = this.formBuilder.group(formGroupConfig);
  }

  public save() {
    if (this.id) {
      this.dataService.update(this.id, this.form.value).subscribe(() => null);
      return;
    }
    this.dataService.create(this.form.value)
      .subscribe(
        id => this.location.replaceState(`${this.collectionName}/edit/${id}`)
      );
  }

  public loadEntity(id: string) {
    this.dataService.getById(id).subscribe(dto => {
      this.setEntityColumnsValues(this.entity, dto);
      this.form.patchValue(this.entity);
    });
  }

  public dispose() {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  public openLookup(entitySchemaName: string, formControlName: string, displayedColumns: Array<{ path: string, title: string }>) {
    const entity = this.createEntity(entitySchemaName);
    const collectionName = entity.getCollectionName();
    const dialogRef = this.dialog.open(LookupDialogComponent, {
      width: this.isMobile ? '320px' : '800px',
      data: {
        collectionName,
        displayedColumns
      } as DialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && formControlName) {
        this.setEntityColumnsValues(entity, result);
        this.form.get(formControlName).setValue(entity);
      }
    });
  }

  private setUpDeps() {
    this.dataService = this.injector.get(DataService);
    this.translate = this.injector.get(TranslateService);
    this.formBuilder = this.injector.get(FormBuilder);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.location = this.injector.get(Location);
    this.dialog = this.injector.get(MatDialog);
  }
}
