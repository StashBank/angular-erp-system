import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreModule } from '../core/core.module';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { AppTranslateService } from '../app-translate.service';
import { OrderFeaturesComponent } from './components/order-features/order-features.component';

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
  declarations: [OrderListComponent, OrderPageComponent, OrderFeaturesComponent],
  providers: [
    { provide: TranslateService, useExisting: AppTranslateService }
  ]
})
export class OrdersModule { }
