import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';

const routes: Routes = [
  { path: '', component: CustomerListComponent, pathMatch: 'full' },
  { path: 'new', component: CustomerPageComponent },
  { path: 'edit/:id', component: CustomerPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
