import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { StoresRoutingModule } from './stores-routing.module';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StorePageComponent } from './components/store-page/store-page.component';

@NgModule({
  imports: [
    CoreModule,
    StoresRoutingModule
  ],
  declarations: [StoreListComponent, StorePageComponent]
})
export class StoresModule { }
