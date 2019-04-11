import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stockList: Array<Stock>;
  displayedColumns: string[] = ['status', 'item', 'store', 'qty', 'menu'];

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
