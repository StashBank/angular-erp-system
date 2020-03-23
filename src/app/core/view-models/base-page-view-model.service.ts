import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, Validators, FormArray } from '@angular/forms';
import { LookupDialogComponent, DialogData } from '../components/lookup-dialog/lookup-dialog.component';
import { BaseModel } from '../models/base.model';
import { Observable } from 'rxjs';
import { DataValueType, ModelPropertyDescriptor, DropDownConfig } from '../decorators/property.decorator';
import { BaseViewModel } from './base-view-model.service';
import { ModelDescriptor } from '../decorators/model.decorator';

export abstract class BasePageViewModel extends BaseViewModel {

  public form: FormGroup;
  public id: string;

  protected entity: BaseModel;

  private mobileQueryListener: (ev: MediaQueryListEvent) => void;

  get saveButtonEnabled(): boolean {
    return this.form && this.form.valid;
  }

  public get isMobile(): boolean {
    return this.mobileQuery && this.mobileQuery.matches;
  }

  public get title(): Observable<string> {
    const caption = this.entity.getCaption();
    return this.translate.get(caption);
  }

  abstract get subTitle$(): Observable<string>;

  protected get collectionName(): string {
    return this.entity.getModelDescriptor().name;
  }

  public init() {
    super.init();

    const changeDetectorRef = this.injector.get(ChangeDetectorRef);
    const media = this.injector.get(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = _ => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);

    this.entity = this.createEntity(this.entitySchemaName);
    this.initForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadEntity(id);
      }
    });
  }

  public save() {
    const values = this.form.getRawValue();
    const dto = this.createEntity(this.entitySchemaName);
    this.setEntityColumnsValues(dto, values);
    if (this.id) {
      this.dataService.update(this.id, dto).subscribe(() => this.onSaved());
    } else {
      this.dataService.create(dto).subscribe(x => {
        this.onSaved();
        this.location.replaceState(`${this.collectionName}/edit/${x.id}`);
      });
    }
  }

  public loadEntity(id: string) {
    this.dataService.getById(id).subscribe(dto => {
      this.setEntityColumnsValues(this.entity, dto);
      this.createFormArrays(this.entity);
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

  public openLookupDialog(entity: BaseModel, displayedColumns: Array<{ path: string, title: string }>): Observable<any> {
    const collectionName = entity.getCollectionName();
    const dialogRef = this.dialog.open(LookupDialogComponent, {
      width: this.isMobile ? '320px' : '800px',
      data: {
        collectionName,
        displayedColumns
      } as DialogData
    });
    return dialogRef.afterClosed();
  }

  protected initForm() {
    const properties = this.entity.getModelProperties().map(x => x.toString());
    this.form = this.createForm(properties, this.entitySchema);
  }

  protected createForm(properties: Array<string>, entitySchema: ModelDescriptor): FormGroup {
    const formGroupConfig = properties
      .reduce((config, propertyName) => {
        const propertyDescriptor = entitySchema.getPropertyDescriptor(propertyName) || {} as ModelPropertyDescriptor;
        if (!propertyDescriptor.hidden) {
          const validators = propertyDescriptor && propertyDescriptor.validators || [];
          if (propertyDescriptor && propertyDescriptor.required) {
            validators.push(Validators.required);
          }
          const defVal = propertyDescriptor.defaultValue;
          config[propertyName] = propertyDescriptor.dataValueType === DataValueType.Array
            ? this.formBuilder.array([])
            : [{
              value: defVal && defVal.constructor === Function ? defVal() : defVal,
              disabled: propertyDescriptor.readOnly
            }, validators];
        }
        return config;
      }, {});
    return this.formBuilder.group(formGroupConfig);
  }

  protected createFormArrays(values: BaseModel) {
    if (values) {
      Object.keys(values)
        .map(key => this.getEntitySchemaPropertyByName(key))
        .filter(metadata => metadata.dataValueType === DataValueType.Array)
        .forEach(metadata => {
          const arr = values[metadata.name];
          this.createFormArray(metadata, arr);
        });
    }
  }

  protected createFormArray(metadata: ModelPropertyDescriptor, arr: Array<any>) {
    if (Array.isArray(arr)) {
      const formArray = this.form.get(metadata.name) as FormArray;
      if (formArray) {
        const config = metadata.dataValueTypeConfig as DropDownConfig;
        // tslint:disable-next-line:ban-types
        const refSchema = this.getEntitySchemaByName(
          this.getSchemaName(config.refModel as any)
        );
        const properties = refSchema.getProperties().map(p => p.name);
        formArray.controls = arr.map(v => this.createForm(properties, refSchema));
      }
    }
  }

  protected onSaved() {
    const message = this.translate.instant('common.messages.saved');
    this.snackBar.open(message, null, {
      duration: 800
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

}
