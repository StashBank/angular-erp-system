import { Component, OnInit } from '@angular/core';

import { TransactionViewModelService } from '../../services/transaction-view-model.service';
import { DataService } from '../../../core/data.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css'],
  providers: [
    TransactionViewModelService,
    { provide: DataService, useClass: TransactionService }
  ]
})
export class TransactionPageComponent implements OnInit {

  constructor(public vm: TransactionViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
