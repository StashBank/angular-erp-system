import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'stocks', pathMatch: 'full' },
  { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
  { path: 'items', loadChildren: './items/items.module#ItemsModule' },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersModule' },
  { path: 'stocks', loadChildren: './stocks/stocks.module#StocksModule' },
  { path: 'stores', loadChildren: './stores/stores.module#StoresModule' },
  { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
