import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { StocksRoutingModule } from './stocks-routing.module';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockPageComponent } from './components/stock-page/stock-page.component';

@NgModule({
  imports: [
    CoreModule,
    StocksRoutingModule
  ],
  declarations: [StockListComponent, StockPageComponent]
})
export class StocksModule { }
