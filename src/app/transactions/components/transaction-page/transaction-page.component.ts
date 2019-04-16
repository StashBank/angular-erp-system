import { Component, OnInit } from '@angular/core';

import { TransactionViewModelService } from '../../services/transaction-view-model.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css'],
  providers: [
    TransactionViewModelService
  ]
})
export class TransactionPageComponent implements OnInit {

  constructor(public vm: TransactionViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
