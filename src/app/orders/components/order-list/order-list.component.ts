import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderList: Array<Order>;
  displayedColumns: string[] = ['number', 'date', 'qty', 'customer', 'item', 'store', 'menu'];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAll().subscribe(orders => this.orderList = orders);
  }

  edit(order: Order) {
    this.router.navigate(['edit', order.id], { relativeTo: this.route});
  }

  remove(order: Order) {
    this.orderService.remove(order.id).subscribe(() => null);
  }

}
