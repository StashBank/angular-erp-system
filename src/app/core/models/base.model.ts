import { ModelProperty, ModelPropertyDescriptor } from '../decorators/property.decorator';
import { Model, ModelDescriptor } from '../decorators/model.decorator';

export class BaseModel {
  @ModelProperty()
  id: string;

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
    return metaData && metaData.name;
  }
}
