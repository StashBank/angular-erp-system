
export class ModelDescriptor {
  name: string;
  primaryPropertyName ? = 'id';
  displayPropertyName ? = 'name';
  imagePropertyName ? = 'image';
}

export function Model(descriptor: ModelDescriptor): ClassDecorator {
  descriptor = Object.assign(new ModelDescriptor(), descriptor);
  return target => {
    Reflect.defineMetadata('model', descriptor, target);
  };
}

Model.getModelProperties = (target): Array<string | symbol> => {
  return Reflect.getMetadata('modelProperties', target) as Array<string | symbol>;
};

Model.getDescriptor = (target): ModelDescriptor => {
  return Reflect.getMetadata('model', target);
};
