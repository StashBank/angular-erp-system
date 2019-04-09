import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { CustomerRoutingModule } from './customer.routing.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';

@NgModule({
  imports: [
    CoreModule,
    CustomerRoutingModule
  ],
  declarations: [CustomerListComponent, CustomerPageComponent]
})
export class CustomerModule { }
