import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CoreModule } from '../core/core.module';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemPageComponent } from './components/item-page/item-page.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    CoreModule,
    ItemsRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      // isolate: true
    })
  ],
  declarations: [ItemListComponent, ItemPageComponent]
})
export class ItemsModule { }
