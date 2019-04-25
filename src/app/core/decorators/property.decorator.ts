
import { ValidatorFn } from '@angular/forms';
import { BaseModel } from '../models/base.model';

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
  Custom = 'custom'
}

export class DropDownConfig {
  refModel: BaseModel;
  filters?: any;
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
  dataValueType: DataValueType = DataValueType.Text;
  dateValueTypeConfig?: LookupConfig | DropDownConfig | DecimalConfig | IntegerConfig | DateConfig;
  required?: boolean;
  readOnly?: boolean;
  validators?: Array<ValidatorFn>;
  defaultValue?: any;
  dataLocalizationPath?: string;
}


export function ModelProperty(descriptor?: ModelPropertyDescriptor): PropertyDecorator {
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
    Reflect.defineMetadata(`model->${propertyKey.toString()}`, descriptor, target.constructor);
  };
}

ModelProperty.getDescriptor = (propertyKey: string | symbol, target): ModelPropertyDescriptor => {
  return Reflect.getMetadata(`model->${propertyKey.toString()}`, target);
};
