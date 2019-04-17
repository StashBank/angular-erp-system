import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreModule } from '../core/core.module';

import { StocksRoutingModule } from './stocks-routing.module';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockPageComponent } from './components/stock-page/stock-page.component';
import { AppTranslateService } from '../app-translate.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CoreModule,
    StocksRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      // isolate: true
    })
  ],
  declarations: [StockListComponent, StockPageComponent],
  providers: [
    { provide: TranslateService, useExisting: AppTranslateService }
  ]
})
export class StocksModule { }
