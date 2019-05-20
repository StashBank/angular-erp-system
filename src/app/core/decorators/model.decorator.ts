// tslint:disable: ban-types
import { ModelPropertyDescriptor, ModelProperty } from './property.decorator';
import { ModelMethod, ModelMethodDescriptor } from './method.decorator';

export class ModelDescriptor {
  name: string;
  caption: string;
  collectionName: string;
  primaryPropertyName ? = 'id';
  displayPropertyName ? = 'name';
  imagePropertyName ? = 'image';
  getPropertyDescriptor?: (name) => ModelPropertyDescriptor;
  getMethodDescriptor?: (name) => ModelMethodDescriptor;
  getMethods?: () => Array<ModelMethodDescriptor>;
  getProperties?: () => Array<ModelPropertyDescriptor>;
}

export class SchemaDescriptor {
  name: string;
  ctor: Function;
  descriptor: ModelDescriptor;
}

export function Model(descriptor: ModelDescriptor): ClassDecorator {
  descriptor = Object.assign(new ModelDescriptor(), descriptor);
  return target => {
    let models = Reflect.getMetadata('models', Object.prototype) as Array<any>;
    if (!models) {
      models = [];
      Reflect.defineMetadata('models', models, Object.prototype);
    }
    if (!models.includes(x => x.name === descriptor.name)) {
      models.push({
        name: descriptor.name,
        ctor: target,
        descriptor
      });
    }
    Reflect.defineMetadata('model', descriptor, target);
  };
}

Model.getModelProperties = (target: Function): Array<string | symbol> => {
  return Reflect.getMetadata('modelProperties', target) as Array<string | symbol>;
};

Model.getModelMethods = (target: Function): Array<string | symbol> => {
  return Reflect.getMetadata('modelMethods', target) as Array<string | symbol>;
};

Model.getDescriptor = (target: Function): ModelDescriptor => {
  return Reflect.getMetadata('model', target);
};

Model.getModelDescriptor = (name: string): ModelDescriptor => {
  const metaData = Reflect.getMetadata('models', Object.prototype) as Array<SchemaDescriptor>;
  const schema = metaData.find(x => x.name === name);
  return {
    ... schema.descriptor,
    getPropertyDescriptor: (propertyName: string): ModelPropertyDescriptor => ModelProperty.getDescriptor(propertyName, schema.ctor),
    getMethodDescriptor: (methodName: string): ModelMethodDescriptor => ModelMethod.getDescriptor(methodName, schema.ctor),
    getProperties: (): Array<ModelPropertyDescriptor> => Model.getModelProperties(schema.ctor)
    .map(
      (propertyName: string) => ModelProperty.getDescriptor(propertyName, schema.ctor)
    ),
    getMethods: (): Array<ModelMethodDescriptor> => Model.getModelMethods(schema.ctor)
    .map(
      (propertyName: string) => ModelMethod.getDescriptor(propertyName, schema.ctor)
    ),
  };
};
