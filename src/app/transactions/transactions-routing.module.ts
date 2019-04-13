import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionPageComponent } from './components/transaction-page/transaction-page.component';

const routes: Routes = [
  { path: '', component: TransactionListComponent, pathMatch: 'full' },
  { path: 'new', component: TransactionPageComponent },
  { path: 'edit/:id', component: TransactionPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule {}
