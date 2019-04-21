import { Injectable, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { BaseViewModel } from '../../core/view-models/base-view-model.service';
import { Item } from '../models/item';
import { ItemType } from '../enums/item-type.enum';
import { ItemService } from './item.service';

@Injectable()
export class ItemViewModelService extends BaseViewModel {

  entitySchemaName: 'items';
  item: Item;
  itemTypes: Array<{ name: string, value: string }> = [
    { value: ItemType.Goods.toString(), name: 'Goods' },
    { value: ItemType.Services.toString(), name: 'Services' },
  ];
  contractorDisplayColumns: Array<{ path: string, title: string }> = [
    { path: 'name', title: 'customers.label.name' },
    { path: 'phone', title: 'customers.label.phone' },
    { path: 'email', title: 'customers.label.email' },
    { path: 'address', title: 'customers.label.address' },
  ];

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.item && this.item.name })
      : this.translate.get('common.create-new');
  }

  constructor(injector: Injector, protected itemService: ItemService) {
    super(injector);
  }

  init() {
    this.createForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadItem(id);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      code: null,
      barCode: null,
      type: null,
      description: null,
      price: [0, [Validators.min(0.001)]],
      contractor: [],
      image: null
    });
  }

  save() {
    if (this.id) {
      this.itemService.update(this.id, this.form.value).subscribe(() => null);
      return;
    }
    this.itemService.create(this.form.value)
      .subscribe(
        // id => this.router.navigate(['..', 'edit', id], { relativeTo: this.route })
        id => this.location.replaceState(`items/edit/${id}`)
      );
  }

  loadItem(id: string) {
    this.itemService.getById(id).subscribe(item => {
      this.item = item;
      this.form.patchValue(item);
    });
  }

}
