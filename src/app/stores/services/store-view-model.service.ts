import { Injectable, Injector } from '@angular/core';

import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';
import { Store } from '../models/store';
import { StoreType } from '../enums/store-type.enum';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';
@Injectable()
export class StoreViewModelService extends BasePageViewModel {

  entitySchemaName = 'Store';
  entity = new Store();

  storeTypes: Array<{ name: string, value: string }> = [
    { value: StoreType.Department.toString(), name: 'stores.enums.type.department' },
    { value: StoreType.BigBox.toString(), name: 'stores.enums.type.big-box' },
    { value: StoreType.Special.toString(), name: 'stores.enums.type.special' },
    { value: StoreType.Discount.toString(), name: 'stores.enums.type.discount' },
    { value: StoreType.ECommerce.toString(), name: 'stores.enums.type.e-commerce' },
  ];

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.name })
      : this.translate.get('common.create-new');
  }

  constructor(injector: Injector, protected storeService: StoreService) {
    super(injector);
  }

}
