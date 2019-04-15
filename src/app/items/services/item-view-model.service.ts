import { Injectable } from '@angular/core';
import { BaseViewModel } from 'src/app/core/view-models/base-view-model.service';

@Injectable()
export class ItemViewModelService extends BaseViewModel {

  entitySchemaName: 'items';

}
