import { Injectable, Inject, Injector } from '@angular/core';
import { BaseSectionViewModel } from '../../core/view-models/base-section-view-model.service';

@Injectable()
export class OrderSectionViewModelService extends BaseSectionViewModel {

  entitySchemaName = 'Order';
  displayedColumns: string[] = ['number', 'date', 'qty', 'customer', 'item', 'store', 'menu'];

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }

}
