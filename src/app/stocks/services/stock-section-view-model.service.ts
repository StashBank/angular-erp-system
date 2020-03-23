import { Injectable, Inject, Injector } from '@angular/core';
import { BaseSectionViewModel } from '../../core/view-models/base-section-view-model.service';
import { StockStatus } from '../enums/stock-status.enum';

@Injectable()
export class StockSectionViewModelService extends BaseSectionViewModel {

  entitySchemaName = 'Stock';
  displayedColumns: string[] = ['status', 'item', 'store', 'qty', 'menu'];
  stockStatuses: { [key: number]: string } = {
    [StockStatus.Available]: 'stocks.enums.status.available',
    [StockStatus.InTransit]: 'stocks.enums.status.in-transit',
    [StockStatus.OnHold]: 'stocks.enums.status.on-hold',
    [StockStatus.OnService]: 'stocks.enums.status.on-service',
  };

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }

}
