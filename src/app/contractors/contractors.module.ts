import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { AppTranslateService } from '../app-translate.service';

import { ContractorListComponent } from './components/contractor-list/contractor-list.component';
import { ContractorPageComponent } from './components/contractor-page/contractor-page.component';
import { ContractorsRoutingModule } from './contractors-routing.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CoreModule,
    ContractorsRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
    })
  ],
  declarations: [ContractorListComponent, ContractorPageComponent],
  providers: [
    { provide: TranslateService, useExisting: AppTranslateService }
  ]
})
export class ContractorsModule { }
