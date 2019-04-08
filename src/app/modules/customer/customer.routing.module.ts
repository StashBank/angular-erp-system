import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerListComponent } from './components/customer-list/customer-list.compone'

const routes: Routes = [
  { path: '', component: CustomerListComponent, pathMatch: 'full' },
]

@NgModule({})
export class CustomerRoutingModule {}
