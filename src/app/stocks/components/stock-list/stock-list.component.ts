import { Component, OnInit } from '@angular/core';
import { BaseSectionViewModel } from '../../../core/view-models/base-section-view-model.service';
import { DataService } from '../../../core/data.service';
import { StockService } from '../../services/stock.service';
import { StockSectionViewModelService } from '../../services/stock-section-view-model.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
  providers: [
    { provide: BaseSectionViewModel, useClass: StockSectionViewModelService },
    { provide: DataService, useClass: StockService }
  ]
})
export class StockListComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }


}
