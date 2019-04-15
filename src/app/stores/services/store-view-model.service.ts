import { Injectable } from '@angular/core';
import { BaseViewModel } from '../../core/view-models/base-view-model.service';

@Injectable()
export class StoreViewModelService extends BaseViewModel {

  entitySchemaName: 'stores';

}
