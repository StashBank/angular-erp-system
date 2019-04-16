import { Component, OnInit } from '@angular/core';
import { StockViewModelService } from '../../services/stock-view-model.service';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css'],
  providers: [
    StockViewModelService
  ]
})
export class StockPageComponent implements OnInit {

  constructor(public vm: StockViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
