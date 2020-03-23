import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
  { path: 'contractors', loadChildren: './contractors/contractors.module#ContractorsModule' },
  { path: 'items', loadChildren: './items/items.module#ItemsModule' },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersModule' },
  { path: 'stocks', loadChildren: './stocks/stocks.module#StocksModule' },
  { path: 'stores', loadChildren: './stores/stores.module#StoresModule' },
  { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsModule' },
  { path: 'profile', loadChildren: './auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
