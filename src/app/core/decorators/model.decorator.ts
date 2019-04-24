import 'reflect-metadata';

export class ModelDescriptor {
  name: string;
  primaryPropertyName: string;
  displayPropertyName: string;
}

export function Model(descriptor: ModelDescriptor): ClassDecorator {
  return target => {
    Reflect.defineMetadata('model', descriptor, target);
  };
}
