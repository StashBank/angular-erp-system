import { Injectable, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseViewModel } from '../../core/view-models/base-view-model.service';
import { Stock } from '../models/stock';
import { StockService } from './stock.service';

@Injectable()
export class StockViewModelService extends BaseViewModel {

  entitySchemaName: 'stocks';
  stock: Stock;

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.stock && this.stock.number })
      : this.translate.get('common.create-new');
  }

  constructor(injector: Injector, protected stockService: StockService) {
    super(injector);
  }

  init() {
    this.createForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadStock(id);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      item: [null, [Validators.required]],
      store: [null, [Validators.required]],
      qty: [null, [Validators.required]],
      status: null,
    });
  }

  save() {
    if (this.id) {
      this.stockService.update(this.id, this.form.value).subscribe(() => null);
      return;
    }
    this.stockService.create(this.form.value)
      .subscribe(
        // id => this.router.navigate(['..', 'edit', id], { relativeTo: this.route })
        id => this.location.replaceState(`stocks/edit/${id}`)
      );
  }

  loadStock(id: string) {
    this.stockService.getById(id).subscribe(stock => {
      this.stock = stock;
      this.form.patchValue(stock);
    });
  }

}
