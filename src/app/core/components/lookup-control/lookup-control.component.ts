import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BasePageViewModel } from '../../view-models/base-page-view-model.service';
import { ModelDescriptor } from '../../decorators/model.decorator';
import { DataValueType, LookupConfig, ModelPropertyDescriptor } from '../../decorators/property.decorator';
import { EntitySchemaManagerService } from '../../services/entity-schema-namager.service';
import { BaseModel } from '../../models/base.model';

@Component({
  selector: 'app-lookup-control',
  templateUrl: './lookup-control.component.html',
  styleUrls: ['./lookup-control.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LookupControlComponent),
      multi: true
    }
  ],
})
export class LookupControlComponent implements OnInit, ControlValueAccessor {

  @Input() propertyName: string;
  value: any;
  disabled: boolean;
  onChange: (value: any) => void;
  onTouched: () => void;

  get entitySchema(): ModelDescriptor {
    return this.vm.getEntitySchema();
  }

  get entitySchemaColumn(): ModelPropertyDescriptor {
    const property = this.entitySchema.getPropertyDescriptor(this.propertyName);
    return property;
  }

  get lookupConfig(): LookupConfig {
    const property = this.entitySchemaColumn;
    let config = null;
    if (property && property.dataValueType === DataValueType.Lookup) {
      config = property.dataValueTypeConfig as LookupConfig;
    }
    return config;
  }

  constructor(
    public vm: BasePageViewModel,
    private esm: EntitySchemaManagerService
  ) { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.value = obj || null;
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

  openLookup() {
    const config = this.lookupConfig;
    if (config) {
      const schemaName = this.esm.getSchemaName(config.refModel as any);
      const entity = this.esm.createEntity(schemaName);
      const refSchema = this.esm.getEntitySchemaByName(schemaName);
      let displayColumnNames = refSchema.displayPropertyName ? [refSchema.displayPropertyName] : [];
      displayColumnNames = [...displayColumnNames, ...(config.displayColumns || []).filter(x => displayColumnNames.indexOf(x) < 0)];
      const displayColumns = displayColumnNames
        .map(path => refSchema.getPropertyDescriptor(path))
        .filter(c => !!c)
        .map(column => {
          return {
            path: column.name,
            title: column.caption
          };
        });
      this.vm.openLookupDialog(entity, displayColumns).subscribe(
        result => this.onLookupResult(entity, result, config.columns)
      );
    }
  }

  onLookupResult(entity: BaseModel, result, columns: string[]) {
    const entitySchema = this.entitySchema;
    let { primaryPropertyName, displayPropertyName } = entitySchema;
    primaryPropertyName = primaryPropertyName || 'id';
    displayPropertyName = displayPropertyName || 'name';
    const values = {
      [primaryPropertyName]: result[primaryPropertyName],
      [displayPropertyName]: result[displayPropertyName],
    };
    if (entitySchema.imagePropertyName) {
      values[entitySchema.imagePropertyName] = result[entitySchema.imagePropertyName]
    }
    if (Array.isArray(columns)) {
      columns.forEach(path => values[path] = result[path]);
    }
    this.esm.setEntityColumnsValues(entity, values);
    this.value = entity;
    this.onChange(entity);
  }

}
