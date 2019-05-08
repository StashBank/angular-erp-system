import { Injectable, Injector } from '@angular/core';
import { Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type.enum';
import { ItemService } from './item.service';
import { LookupConfig } from 'src/app/core/decorators/property.decorator';
import { ItemFeature } from '../models/item-feature';

@Injectable()
export class ItemViewModelService extends BasePageViewModel {

  protected entitySchemaName = 'Item';
  protected entity = new Item();
  private featureEntity = new ItemFeature();

  itemTypes: Array<{ name: string, value: string }> = [
    { value: ItemType.Goods.toString(), name: 'items.enums.type.goods' },
    { value: ItemType.Services.toString(), name: 'items.enums.type.services' },
  ];
  contractorDisplayColumns: Array<{ path: string, title: string }> = [
    { path: 'name', title: 'customers.caption.name' },
    { path: 'phone', title: 'customers.caption.phone' },
    { path: 'email', title: 'customers.caption.email' },
    { path: 'address', title: 'customers.caption.address' },
  ];

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.name })
      : this.translate.get('common.create-new');
  }

  get featureControlList(): Array<AbstractControl> {
    const featureFormArray = this.form.get('features') as FormArray;
    return featureFormArray.controls;
  }

  constructor(injector: Injector, protected itemService: ItemService) {
    super(injector);
  }

  addFeature() {
    const schema = this.entitySchema.getPropertyDescriptor('features');
    const config = schema.dataValueTypeConfig as LookupConfig;
    const refSchema = this.getEntitySchemaByName((config.refModel as Function).name);
    const properties = refSchema.getProperties().map(x => x.name);
    this.featureControlList.push(
      this.createForm(properties, refSchema)
    );
  }

}
