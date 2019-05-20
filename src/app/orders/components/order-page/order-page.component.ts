import { Component, OnInit } from '@angular/core';
import { OrderViewModelService } from '../../services/order-view-model.service';
import { DataService } from '../../../core/data.service';
import { OrderService } from '../../services/order.service';
import { BasePageViewModel } from 'src/app/core/view-models/base-page-view-model.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [
    OrderViewModelService,
    { provide: BasePageViewModel, useExisting: OrderViewModelService },
    { provide: DataService, useExisting: OrderService }
  ]
})
export class OrderPageComponent implements OnInit {

  constructor(public vm: OrderViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
