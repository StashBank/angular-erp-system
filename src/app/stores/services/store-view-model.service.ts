import { Injectable, Injector } from '@angular/core';

import { Validators } from '@angular/forms';


import { BaseViewModel } from '../../core/view-models/base-view-model.service';
import { Store } from '../models/store';
import { StoreType } from '../enums/store-type.enum';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';
@Injectable()
export class StoreViewModelService extends BaseViewModel {

  entitySchemaName: 'stores';

  store: Store;
  storeTypes: Array<{ name: string, value: string }> = [
    { value: StoreType.Department.toString(), name: 'stores.enums.type.department' },
    { value: StoreType.BigBox.toString(), name: 'stores.enums.type.big-box' },
    { value: StoreType.Special.toString(), name: 'stores.enums.type.special' },
    { value: StoreType.Discount.toString(), name: 'stores.enums.type.discount' },
    { value: StoreType.ECommerce.toString(), name: 'stores.enums.type.e-commerce' },
  ];

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.store && this.store.name })
      : this.translate.get('common.create-new');
  }

  constructor(injector: Injector, protected storeService: StoreService) {
    super(injector);
  }

  init() {
    this.createForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadStore(id);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      code: null,
      type: null,
      status: null,
      phone: null,
      address: null,
    });
  }

  save() {
    if (this.id) {
      this.storeService.update(this.id, this.form.value).subscribe(() => null);
      return;
    }
    this.storeService.create(this.form.value)
      .subscribe(
        // id => this.router.navigate(['..', 'edit', id], { relativeTo: this.route })
        id => this.location.replaceState(`stores/edit/${id}`)
      );
  }

  loadStore(id: string) {
    this.storeService.getById(id).subscribe(store => {
      this.store = store;
      this.form.patchValue(store);
    });
  }

}
