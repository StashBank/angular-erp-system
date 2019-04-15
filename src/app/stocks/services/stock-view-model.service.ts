import { Injectable } from '@angular/core';
import { BaseViewModel } from '../../core/view-models/base-view-model.service';

@Injectable()
export class StockViewModelService extends BaseViewModel {

  entitySchemaName: 'stocks';

}
