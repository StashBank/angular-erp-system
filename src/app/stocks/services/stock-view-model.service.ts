import { Injectable, Injector, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';
import { Stock } from '../models/stock';
import { StockService } from './stock.service';
import { StockStatus } from '../enums/stock-status.enum';

@Injectable()
export class StockViewModelService extends BasePageViewModel {

  entitySchemaName = 'Stock';
  entity = new Stock();
  stockStatuses: Array<{ name: string, value: string }> = [
    { value: StockStatus.Available.toString(), name: 'stocks.enums.status.available' },
    { value: StockStatus.InTransit.toString(), name: 'stocks.enums.status.in-transit' },
    { value: StockStatus.OnHold.toString(), name: 'stocks.enums.status.on-hold' },
    { value: StockStatus.OnService.toString(), name: 'stocks.enums.status.on-service' },
  ];
  itemsDisplayedColumns = [
    { path: 'name', title: 'items.caption.name' },
    { path: 'code', title: 'items.caption.code' },
    { path: 'barCode', title: 'items.caption.bar-code' },
  ];
  storesDisplayedColumns = [
    { path: 'name', title: 'stores.caption.name' },
    { path: 'code', title: 'items.caption.code' },
  ];

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.number || '' })
      : this.translate.get('common.create-new');
  }

  constructor(@Inject(Injector) injector: Injector, protected stockService: StockService) {
    super(injector);
  }

}
