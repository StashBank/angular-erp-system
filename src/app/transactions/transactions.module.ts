import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionPageComponent } from './components/transaction-page/transaction-page.component';
import { AppTranslateService } from '../app-translate.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CoreModule,
    TransactionsRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      // isolate: true
    })
  ],
  declarations: [TransactionListComponent, TransactionPageComponent],
  providers: [
    { provide: TranslateService, useExisting: AppTranslateService }
  ]
})
export class TransactionsModule { }
