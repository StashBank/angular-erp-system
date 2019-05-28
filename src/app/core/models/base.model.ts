import { Guid } from 'guid-typescript';
import { ModelProperty, ModelPropertyDescriptor } from '../decorators/property.decorator';
import { Model, ModelDescriptor } from '../decorators/model.decorator';

export class BaseModel {

  id: string;

  static toString(): string {
    return 'BaseModel';
  }


  toString(): string {
    const displayColumnName = this.getDisplayColumnName();
    const stringValue = this[displayColumnName];
    return stringValue || '';
  }

  getModelDescriptor(): ModelDescriptor {
    return Model.getDescriptor(this.constructor);
  }

  getModelProperties(): Array<string | symbol>  {
    return Model.getModelProperties(this.constructor);
  }

  getPropertyDescriptor(propertyKey: string | symbol): ModelPropertyDescriptor {
    return ModelProperty.getDescriptor(propertyKey, this.constructor);
  }

  getPrimaryColumnName(): string {
    const metaData = this.getModelDescriptor();
    return metaData && metaData.primaryPropertyName;
  }

  getDisplayColumnName(): string {
    const metaData = this.getModelDescriptor();
    return metaData && metaData.displayPropertyName;
  }

  getImageColumnName(): string {
    const metaData = this.getModelDescriptor();
    return metaData && metaData.imagePropertyName;
  }

  getCollectionName(): string {
    const metaData = this.getModelDescriptor();
    return metaData && metaData.collectionName;
  }

  getCaption(): string {
    const metaData = this.getModelDescriptor();
    return metaData && metaData.caption;
  }
}
