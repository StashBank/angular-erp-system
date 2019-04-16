import { Component, OnInit } from '@angular/core';
import { OrderViewModelService } from '../../services/order-view-model.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [
    OrderViewModelService
  ]
})
export class OrderPageComponent implements OnInit {

  constructor(public vm: OrderViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
