import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';
import { StockStatus } from '../../enums/stock-status.enum';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stockList: Array<Stock>;
  displayedColumns: string[] = ['status', 'item', 'store', 'qty', 'menu'];
  stockStatuses: { [key: number]: string } = {
    [StockStatus.Available]: 'stocks.enums.status.available',
    [StockStatus.InTransit]: 'stocks.enums.status.in-transit',
    [StockStatus.OnHold]: 'stocks.enums.status.on-hold',
    [StockStatus.OnService]: 'stocks.enums.status.on-service',
  };

  constructor(
    private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadStocks();
  }

  loadStocks() {
    this.stockService.getAll().subscribe(stocks => this.stockList = stocks);
  }

  edit(stock: Stock) {
    this.router.navigate(['edit', stock.id], { relativeTo: this.route});
  }

  remove(stock: Stock) {
    this.stockService.remove(stock.id).subscribe(() => null);
  }

}
