import { StockStatus } from '../enums/stock-status.enum';
import { Item } from '../../items/models/item';
import { Store } from '../../stores/models/store';
import { Model } from '../../core/decorators/model.decorator';
import { BaseModel } from '../../core/models/base.model';
import { ModelProperty, DataValueType, DropDownConfig, LookupConfig } from '../../core/decorators/property.decorator';
import { Validators } from '@angular/forms';

@Model({
  caption: 'stocks.title',
  name: 'Stock',
  collectionName: 'stocks'
})
export class Stock extends BaseModel {

  @ModelProperty({
    caption: 'common.id',
    dataValueType: DataValueType.Text,
  })
  id: string;

  @ModelProperty({
    caption: 'stocks.caption.number',
    dataValueType: DataValueType.Text,
    readOnly: true,
    defaultValue: () => new Date().valueOf()
  })
  number: string;

  @ModelProperty({
    caption: 'stocks.caption.status',
    dataValueType: DataValueType.DropDown,
    dataValueTypeConfig: {
      refModel: StockStatus
    } as DropDownConfig,
    readOnly: true,
    defaultValue: StockStatus.Available
  })
  status: StockStatus;

  @ModelProperty({
    caption: 'stocks.caption.item',
    dataValueType: DataValueType.Lookup,
    dataValueTypeConfig: {
      refModel: Item,
      displayColumns: ['code', 'barCode', 'price'],
      columns: ['code', 'barCode', 'price'],
    } as LookupConfig
  })
  item: Item;

  @ModelProperty({
    caption: 'stocks.caption.store',
    dataValueType: DataValueType.Lookup,
    dataValueTypeConfig: {
      refModel: Store,
      displayColumns: ['code', 'phone', 'email', 'address'],
      columns: ['code', 'phone'],
    } as LookupConfig
  })
  store: Store;

  @ModelProperty({
    caption: 'stocks.caption.quantity',
    dataValueType: DataValueType.Integer,
    required: true,
    validators: [Validators.min(0)]
  })
  qty: number;

  // TODO: Add validator - More then today
  @ModelProperty({
    caption: 'stocks.caption.number',
    dataValueType: DataValueType.Date,
    required: true,
    defaultValue: () => new Date()
  })
  date: Date;

}
