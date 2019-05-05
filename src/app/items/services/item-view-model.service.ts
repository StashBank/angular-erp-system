import { Injectable, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type.enum';
import { ItemService } from './item.service';

@Injectable()
export class ItemViewModelService extends BasePageViewModel {

  protected entitySchemaName = 'Item';
  protected entity: Item;

  itemTypes: Array<{ name: string, value: string }> = [
    { value: ItemType.Goods.toString(), name: 'items.enums.type.goods' },
    { value: ItemType.Services.toString(), name: 'items.enums.type.services' },
  ];
  contractorDisplayColumns: Array<{ path: string, title: string }> = [
    { path: 'name', title: 'customers.label.name' },
    { path: 'phone', title: 'customers.label.phone' },
    { path: 'email', title: 'customers.label.email' },
    { path: 'address', title: 'customers.label.address' },
  ];

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.name })
      : this.translate.get('common.create-new');
  }

  constructor(injector: Injector, protected itemService: ItemService) {
    super(injector);
  }

}
