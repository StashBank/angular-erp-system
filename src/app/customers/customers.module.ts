import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { CoreModule } from '../core/core.module';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { AppTranslateService } from '../app-translate.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CoreModule,
    CustomersRoutingModule,
    TranslateModule.forChild({
      loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]},
    })
  ],
  declarations: [CustomerListComponent, CustomerPageComponent],
  providers: [
    { provide: TranslateService, useExisting: AppTranslateService }
  ]
})
export class CustomersModule { }
