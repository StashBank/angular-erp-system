import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { StoreRoutingModule } from './store.routing.module';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StorePageComponent } from './components/store-page/store-page.component';

@NgModule({
  imports: [
    CoreModule,
    StoreRoutingModule
  ],
  declarations: [StoreListComponent, StorePageComponent]
})
export class StoreModule { }