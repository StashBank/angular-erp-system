import { Injectable, Injector, Inject } from '@angular/core';

import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';
import { Store } from '../models/store';
import { StoreType } from '../enums/store-type.enum';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';
@Injectable()
export class StoreViewModelService extends BasePageViewModel {

  entitySchemaName = 'Store';
  entity = new Store();

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.name })
      : this.translate.get('common.create-new');
  }

  constructor(@Inject(Injector) injector: Injector, protected storeService: StoreService) {
    super(injector);
  }

}
