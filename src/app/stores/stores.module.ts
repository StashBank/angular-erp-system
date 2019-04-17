import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreModule } from '../core/core.module';
import { StoresRoutingModule } from './stores-routing.module';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StorePageComponent } from './components/store-page/store-page.component';
import { AppTranslateService } from '../app-translate.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CoreModule,
    StoresRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      // isolate: true
    })
  ],
  declarations: [StoreListComponent, StorePageComponent],
  providers: [
    { provide: TranslateService, useExisting: AppTranslateService }
  ]
})
export class StoresModule { }
