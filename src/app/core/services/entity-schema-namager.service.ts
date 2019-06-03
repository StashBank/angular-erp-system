import { Injectable } from '@angular/core';
import { ViewModelActionDescriptor, ViewModelAction } from '../decorators/view-model-action.decorator';
import { BaseViewModel } from '../view-models/base-view-model.service';
import { Model, ModelDescriptor } from '../decorators/model.decorator';
import { BaseModel } from '../models/base.model';
import { DataValueType, LookupConfig, DropDownConfig } from '../decorators/property.decorator';

// tslint:disable: ban-types
@Injectable({
  providedIn: 'root'
})
export class EntitySchemaManagerService {

  constructor() { }

  public getActions(target: BaseViewModel): Array<ViewModelActionDescriptor> {
    const actions = Reflect.getMetadata('viewModelActions', target) as Array<string>;
    const result: Array<ViewModelActionDescriptor> = Array.isArray(actions)
      ? actions.map(name => ViewModelAction.getDescriptor(name, target))
      : null;
    return result;
  }

  public getEntitySchemaByName(entitySchemaName: string): ModelDescriptor {
    return Model.getModelDescriptor(entitySchemaName);
  }

  public createEntity(entitySchemaName: string): BaseModel {
    const models = Reflect.getMetadata('models', Object.prototype) as Array<any>;
    const model = models.find(x => x.name === entitySchemaName);
    const entity = Object.create(model.ctor.prototype);
    return entity as BaseModel;
  }

  public getSchemaName(schema: Function): string {
    return Reflect.getMetadata('model', schema).name;
  }

  public setEntityColumnsValues(entity: BaseModel, values) {
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
  public setEntityColumnValue(entity: BaseModel, key: string, value) {
    if (value && value.toDate && value.toDate.constructor === Function) {
      value = value.toDate();
    }
    const propertyMetaData = entity.getPropertyDescriptor(key);
    if (propertyMetaData) {
      const valueType = propertyMetaData.dataValueType;
      switch (valueType) {
        case DataValueType.Lookup: {
          const lookupConfig = propertyMetaData.dataValueTypeConfig as LookupConfig;
          const refSchema = lookupConfig && lookupConfig.refModel as Function;
          const refSchemaName = refSchema && this.getSchemaName(refSchema);
          if (refSchemaName && typeof value === 'object') {
            const refEntity = this.createEntity(refSchemaName);
            this.setEntityColumnsValues(refEntity, value);
            value = refEntity;
          }
          break;
        }
        case DataValueType.DropDown: {
          /*const dropDownConfig = propertyMetaData.dataValueTypeConfig as DropDownConfig;
          const refSchema = dropDownConfig && dropDownConfig.refModel as any;
          if (refSchema && refSchema.getMetaData) {
            const enumMetaData = refSchema.getMetaData() as EnumDescriptor;
            value = `${enumMetaData.translatePath}.${value}`;
          }*/
          break;
        }
        case DataValueType.Array: {
          // TODO: map each element ot create inner entity;
          value = (Array.isArray(value) ? value : []) as Array<BaseModel>;
          const dropDownConfig = propertyMetaData.dataValueTypeConfig as DropDownConfig;
          const refSchema = dropDownConfig && dropDownConfig.refModel as Function;

          value = value.map(v => {
            const e = this.createEntity(this.getSchemaName(refSchema));
            this.setEntityColumnsValues(e, v);
            return e;
          });
          break;
        }
      }
      entity[key] = value;
    }
  }

}
