import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { CustomersModule } from './customers/customers.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { StocksModule } from './stocks/stocks.module';
import { StoresModule } from './stores/stores.module';
import { TransactionsModule } from './transactions/transactions.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports:      [
    BrowserAnimationsModule,

    CoreModule,
    AppRoutingModule,

    CustomersModule,
    ItemsModule,
    OrdersModule,
    StocksModule,
    StoresModule,
    TransactionsModule
  ],
  declarations: [ AppComponent, HomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
