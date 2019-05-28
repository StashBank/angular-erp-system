
import { ValidatorFn } from '@angular/forms';

// #region Configs
export enum DataValueType {
  Text = 'text',
  RichText = 'richText',
  Decimal = 'number',
  Integer = 'integer',
  Money = 'money',
  Date = 'date',
  Lookup = 'lookup',
  DropDown = 'dropDown',
  Boolean = 'boolean',
  Image = 'image',
  Array = 'array',
  Custom = 'custom'
}

export class DropDownConfig {
  // tslint:disable-next-line:ban-types
  refModel: Function | Object;
  filters?: any;
  columns?: Array<string>;
  translatePath?: string;
}

export class LookupConfig extends DropDownConfig {
  displayColumns?: Array<string>;
}

export abstract class NumberConfig {
  min?: number;
  max?: number;
  unsigned?: boolean;
}

export class IntegerConfig extends NumberConfig {}

export class DecimalConfig extends NumberConfig {}

export class DateConfig {}

export class ModelPropertyDescriptor {
  name?: string;
  caption: string;
  dataValueType: DataValueType = DataValueType.Text;
  dataValueTypeConfig?: LookupConfig | DropDownConfig | DecimalConfig | IntegerConfig | DateConfig;
  required?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  validators?: Array<ValidatorFn>;
  defaultValue?: any;
  dataLocalizationPath?: string;
}
// #endregion

export function ModelProperty(descriptor: ModelPropertyDescriptor): PropertyDecorator {
  descriptor = Object.assign(new ModelPropertyDescriptor(), descriptor);
  return (target, propertyKey) => {
    let modelProperties = Reflect.getMetadata('modelProperties', target.constructor) as Array<string | symbol>;
    if (!modelProperties) {
      modelProperties = [];
      Reflect.defineMetadata('modelProperties', modelProperties, target.constructor);
    }
    if (!modelProperties.includes(propertyKey)) {
      modelProperties.push(propertyKey);
    }
    Reflect.defineMetadata(`model_property_${propertyKey.toString()}`, { ...descriptor, name: propertyKey }, target.constructor);
  };
}

ModelProperty.getDescriptor = (propertyKey: string | symbol, target): ModelPropertyDescriptor => {
  return Reflect.getMetadata(`model_property_${propertyKey.toString()}`, target);
};
