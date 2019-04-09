import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';

@NgModule({
  imports: [
    CoreModule,
    CustomersRoutingModule
  ],
  declarations: [CustomerListComponent, CustomerPageComponent]
})
export class CustomersModule { }
