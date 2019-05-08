import { Component, OnInit } from '@angular/core';
import { StockViewModelService } from '../../services/stock-view-model.service';
import { DataService } from '../../../core/data.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.css'],
  providers: [
    StockViewModelService,
    { provide: DataService, useClass: StockService }
  ]
})
export class StockPageComponent implements OnInit {

  constructor(public vm: StockViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
