import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreModule } from '../core/core.module';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderPageComponent } from './components/order-page/order-page.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CoreModule,
    OrdersRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      // isolate: true
    })
  ],
  declarations: [OrderListComponent, OrderPageComponent]
})
export class OrdersModule { }
