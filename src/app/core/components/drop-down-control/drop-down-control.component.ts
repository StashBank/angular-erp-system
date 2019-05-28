import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { ModelDescriptor } from '../../decorators/model.decorator';
import { ModelPropertyDescriptor, DropDownConfig, DataValueType } from '../../decorators/property.decorator';
import { BasePageViewModel } from '../../view-models/base-page-view-model.service';
import { EntitySchemaManagerService } from '../../services/entity-schema-namager.service';

@Component({
  selector: 'app-drop-down-control',
  templateUrl: './drop-down-control.component.html',
  styleUrls: ['./drop-down-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownControlComponent),
      multi: true
    }
  ],
})
export class DropDownControlComponent implements OnInit, ControlValueAccessor {

  @Input() propertyName: string;
  value: any;
  disabled: boolean;
  enums: Array<{ name: string, value: string }>;
  onChange: (value: any) => void;
  onTouched: () => void;

  get entitySchema(): ModelDescriptor {
    return this.vm.getEntitySchema();
  }

  get entitySchemaColumn(): ModelPropertyDescriptor {
    const property = this.entitySchema.getPropertyDescriptor(this.propertyName);
    return property;
  }

  get dropDownConfig(): DropDownConfig {
    const property = this.entitySchemaColumn;
    let config = null;
    if (property && property.dataValueType === DataValueType.DropDown) {
      config = property.dataValueTypeConfig as DropDownConfig;
    }
    return config;
  }

  get selected(): any {
    return this.value;
  }
  set selected(value: any) {
    this.setValue(value);
  }

  constructor(
    public vm: BasePageViewModel
  ) { }

  ngOnInit() {
    this.enums = this.getEnums();
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setValue(value: any) {
    this.value = value;
    this.onChange(value);
  }

  onFocus() {
    this.onTouched();
  }

  private getEnums(): Array<{ name: string, value: string }> {
    const result = [];
    const config = this.dropDownConfig;
    if (config && config.refModel) {
      const translatePath = config.translatePath || `${this.entitySchema.collectionName}.enums.${this.propertyName}`;
      Object.keys(config.refModel)
        .filter(key => !isNaN(+key))
        .forEach(key => {
          const name = `${translatePath}.${key}`;
          const value = +key;
          result.push({ name, value });
        });
    }
    return result;
  }

}
