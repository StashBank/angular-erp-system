import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { TransactionRoutingModule } from './transaction.routing.module';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionPageComponent } from './components/transaction-page/transaction-page.component';

@NgModule({
  imports: [
    CoreModule,
    TransactionRoutingModule
  ],
  declarations: [TransactionListComponent, TransactionPageComponent]
})
export class TransactionModule { }