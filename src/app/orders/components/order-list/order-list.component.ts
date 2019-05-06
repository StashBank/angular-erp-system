import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { BaseSectionViewModel } from 'src/app/core/view-models/base-section-view-model.service';
import { OrderSectionViewModelService } from '../../services/order-section-view-model.service';
import { DataService } from 'src/app/core/data.service';
import { OrderService } from '../../services/order.service';

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
