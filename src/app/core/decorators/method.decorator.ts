export enum ModelMethodType {
  Action
}

export class ModelMethodAction {
  caption: string;
  icon?: string;
  visible?: () => boolean;
  enabled?: () => boolean;
}

export class ModelMethodDescriptor {
  type?: ModelMethodType = ModelMethodType.Action;
  name?: string;
  config?: ModelMethodAction;
}

export function ModelMethod(options: ModelMethodDescriptor): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    let modelMethods = Reflect.getMetadata('modelMethods', target.constructor) as Array<string | symbol>;
    if (!modelMethods) {
      modelMethods = [];
      Reflect.defineMetadata('modelMethods', modelMethods, target.constructor);
    }
    if (!modelMethods.includes(propertyKey)) {
      modelMethods.push(propertyKey);
    }
    const opts = Object.assign(new ModelMethodDescriptor(), { name: propertyKey.toString() }, options);
    Reflect.defineMetadata(`model_method_${propertyKey.toString()}`, opts, target.constructor);
  };
}

ModelMethod.getDescriptor = (methodKey: string | symbol, target): ModelMethodDescriptor => {
  return Reflect.getMetadata(`model_method_${methodKey.toString()}`, target);
};
