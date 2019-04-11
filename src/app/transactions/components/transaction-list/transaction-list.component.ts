import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactionList: Array<Transaction>;
  displayedColumns: string[] = ['type', 'status', 'from', 'to', 'date', 'qty', 'menu'];

  constructor(
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getAll().subscribe(transactions => this.transactionList = transactions);
  }

  edit(transaction: Transaction) {
    this.router.navigate(['edit', transaction.id], { relativeTo: this.route});
  }

  remove(transaction: Transaction) {
    this.transactionService.remove(transaction.id).subscribe(() => null);
  }

}
