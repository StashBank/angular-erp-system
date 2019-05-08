import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { OrderSectionViewModelService } from '../../services/order-section-view-model.service';
import { OrderService } from '../../services/order.service';
import { BaseSectionViewModel } from '../../../core/view-models/base-section-view-model.service';
import { DataService } from '../../../core/data.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [
    { provide: BaseSectionViewModel, useClass: OrderSectionViewModelService },
    { provide: DataService, useClass: OrderService }
  ]
})
export class OrderListComponent implements OnInit {

  orderList: Array<Order>;
  

  constructor(
  ) { }

  ngOnInit() {
  }


}
