export class ViewModelActionDescriptor {
  name?: string;
  caption: string;
  icon?: string;
  visible?: () => boolean;
  enabled?: () => boolean;
}

export function ViewModelAction(options: ViewModelActionDescriptor): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    let viewModelActions = Reflect.getMetadata('viewModelActions', target) as Array<string | symbol>;
    if (!viewModelActions) {
      viewModelActions = [];
      Reflect.defineMetadata('viewModelActions', viewModelActions, target);
    }
    if (!viewModelActions.includes(propertyKey)) {
      viewModelActions.push(propertyKey);
    }
    const opts = Object.assign(new ViewModelActionDescriptor(), { name: propertyKey.toString() }, options);
    Reflect.defineMetadata(`model_method_${propertyKey.toString()}`, opts, target);
  };
}

ViewModelAction.getDescriptor = (actionName: string | symbol, target): ViewModelActionDescriptor => {
  return Reflect.getMetadata(`model_method_${actionName.toString()}`, target);
};

