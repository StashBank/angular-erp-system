import { Injectable } from '@angular/core';
import { BaseSectionViewModel } from 'src/app/core/view-models/base-section-view-model.service';

@Injectable()
export class OrderSectionViewModelService extends BaseSectionViewModel {

  entitySchemaName = 'Order';
  displayedColumns: string[] = ['number', 'date', 'qty', 'customer', 'item', 'store', 'menu'];

}
