export class ModelMethodDescriptor {}

export function ModelMethod(options: ModelMethodDescriptor): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata(`model->${propertyKey.toString()}`, options, target);
  };
}