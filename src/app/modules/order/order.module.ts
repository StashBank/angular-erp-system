import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { OrderRoutingModule } from './order.routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderPageComponent } from './components/order-page/order-page.component';

@NgModule({
  imports: [
    CoreModule,
    OrderRoutingModule
  ],
  declarations: [OrderListComponent, OrderPageComponent]
})
export class OrderModule { }