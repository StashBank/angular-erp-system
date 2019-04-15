import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/core/view-models/base-view-model.service';

@Injectable()
export class OrderViewModelService extends BaseViewModel {

  entitySchemaName: 'orders';

}
