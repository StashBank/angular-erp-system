import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';

const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'customers', loadChildren: '../customer/customer.module#CustomerModule' },
  { path: 'items', loadChildren: '../item/item.module#ItemModule' },
  { path: 'orders', loadChildren: '../order/order.module#OrderModule' },
  { path: 'stocks', loadChildren: '../stock/stock.module#StockModule' },
  { path: 'stores', loadChildren: '../store/store.module#StoreModule' },
  { path: 'transactions', loadChildren: '../transaction/transaction.module#TransactionModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
