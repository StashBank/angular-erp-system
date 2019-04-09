import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ItemRoutingModule } from './item.routing.module';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemPageComponent } from './components/item-page/item-page.component';

@NgModule({
  imports: [
    CoreModule,
    ItemRoutingModule
  ],
  declarations: [ItemListComponent, ItemPageComponent]
})
export class ItemModule { }
