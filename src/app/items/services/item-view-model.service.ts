import { Injectable, Injector, Inject } from '@angular/core';
import { Validators, FormArray, FormGroup, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type.enum';
import { ItemService } from './item.service';
import { LookupConfig } from '../../core/decorators/property.decorator';
import { ItemFeature } from '../models/item-feature';

@Injectable()
export class ItemViewModelService extends BasePageViewModel {

  protected entitySchemaName = 'Item';
  protected entity = new Item();

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.name })
      : this.translate.get('common.create-new');
  }

  constructor(@Inject(Injector) injector: Injector, protected itemService: ItemService) {
    super(injector);
  }

}
