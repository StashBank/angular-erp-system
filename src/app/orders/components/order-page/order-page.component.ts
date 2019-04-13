import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { OrderType } from '../../enums/order-type.enum';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  form: FormGroup;
  id: string;
  order: Order;
  orderTypes: Array<{ name: string, value: string }> = [
    { value: OrderType.Inbound.toString(), name: 'Inbound' },
    { value: OrderType.Outbound.toString(), name: 'Outbound' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private location: Location
  ) { }

  ngOnInit() {
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
