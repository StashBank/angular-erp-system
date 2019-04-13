import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css']
})
export class StockPageComponent implements OnInit {

  form: FormGroup;
  id: string;
  stock: Stock;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService,
    private location: Location
  ) { }

  ngOnInit() {
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
