import { Injector } from '@angular/core';
import { BaseModel } from '../models/base.model';
import { DataValueType, LookupConfig, DropDownConfig } from '../decorators/property.decorator';
import { DataService } from '../data.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { EnumDescriptor } from '../decorators/enum.decorator';

export abstract class BaseViewModel {

  protected dataService: DataService<BaseModel>;
  protected mobileQuery: MediaQueryList;
  protected translate: TranslateService;
  protected formBuilder: FormBuilder;
  protected route: ActivatedRoute;
  protected router: Router;
  protected location: Location;
  protected dialog: MatDialog;

  protected entitySchemaName: string;

  constructor(
    protected injector: Injector
  ) {
    this.setUpDeps();
  }

  init() {}

  isDate(value): boolean {
    return value && value.constructor === Date;
  }

  protected setUpDeps() {
    this.dataService = this.injector.get(DataService);
    this.translate = this.injector.get(TranslateService);
    this.formBuilder = this.injector.get(FormBuilder);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.location = this.injector.get(Location);
    this.dialog = this.injector.get(MatDialog);
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
      this.setEntityColumnValue(entity, key, value);
    });
  }

  // TODO: refactoring
  protected setEntityColumnValue(entity: BaseModel, key: string, value) {
    if (value && value.constructor.name === 'Timestamp') {
      value = value.toDate();
    }
    const propertyMetaData = entity.getPropertyDescriptor(key);
    if (propertyMetaData) {
      const valueType = propertyMetaData.dataValueType;
      if (valueType === DataValueType.Lookup) {
        const lookupConfig = propertyMetaData.dataValueTypeConfig as LookupConfig;
        const refSchemaName = lookupConfig && lookupConfig.refModel && lookupConfig.refModel.name;
        if (refSchemaName && typeof value === 'object') {
          const refEntity = this.createEntity(refSchemaName);
          this.setEntityColumnsValues(refEntity, value);
          value = refEntity;
        }
      } else if (valueType === DataValueType.DropDown) {
        const dropDownConfig = propertyMetaData.dataValueTypeConfig as DropDownConfig;
        const refSchema = dropDownConfig && dropDownConfig.refModel;
        if (refSchema && refSchema.getMetaData) {
          const enumMetaData = refSchema.getMetaData() as EnumDescriptor;
          value = `${enumMetaData.translatePath}.${value}`;
        }
      }
      entity[key] = value;
    }
  }

}
