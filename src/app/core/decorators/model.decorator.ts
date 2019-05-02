
export class ModelDescriptor {
  name: string;
  caption: string;
  collectionName: string;
  primaryPropertyName ? = 'id';
  displayPropertyName ? = 'name';
  imagePropertyName ? = 'image';
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

Model.getModelProperties = (target): Array<string | symbol> => {
  return Reflect.getMetadata('modelProperties', target) as Array<string | symbol>;
};

Model.getDescriptor = (target): ModelDescriptor => {
  return Reflect.getMetadata('model', target);
};
