import { Injectable, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { BaseViewModel } from '../../core/view-models/base-view-model.service';

import { Order } from '../models/order';
import { OrderType } from '../enums/order-type.enum';
import { OrderService } from './order.service';

@Injectable()
export class OrderViewModelService extends BaseViewModel {

  entitySchemaName: 'orders';
  order: Order;
  orderTypes: Array<{ name: string, value: string }> = [
    { value: OrderType.Inbound.toString(), name: 'Inbound' },
    { value: OrderType.Outbound.toString(), name: 'Outbound' },
  ];
  customersDisplayedColumns = [
    { path: 'name', title: 'customers.caption.name' },
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
      ? this.translate.get('common.edit', { value: this.order && this.order.number })
      : this.translate.get('common.create-new');
  }

  constructor(injector: Injector, protected orderService: OrderService) {
    super(injector);
  }

  init() {
    this.createForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadOrder(id);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      number: [null, [Validators.required]],
      type: [null, [Validators.required]],
      date: new Date(),
      customer: null,
      item: null,
      store: null,
      qty: null
    });
  }

  save() {
    if (this.id) {
      this.orderService.update(this.id, this.form.value).subscribe(() => null);
      return;
    }
    this.orderService.create(this.form.value)
      .subscribe(
        // id => this.router.navigate(['..', 'edit', id], { relativeTo: this.route })
        id => this.location.replaceState(`orders/edit/${id}`)
      );
  }

  loadOrder(id: string) {
    this.orderService.getById(id).subscribe(order => {
      this.order = order;
      this.form.patchValue(order);
    });
  }

}
