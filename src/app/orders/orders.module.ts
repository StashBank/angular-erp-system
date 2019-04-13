import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderPageComponent } from './components/order-page/order-page.component';

@NgModule({
  imports: [
    CoreModule,
    OrdersRoutingModule
  ],
  declarations: [OrderListComponent, OrderPageComponent]
})
export class OrdersModule { }
