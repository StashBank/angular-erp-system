import { Component, OnInit } from '@angular/core';
import { TransactionSectionViewModelService } from '../../services/transaction-section-view-model.service';
import { BaseSectionViewModel } from '../../../core/view-models/base-section-view-model.service';
import { DataService } from '../../../core/data.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
  providers: [
    { provide: BaseSectionViewModel, useClass: TransactionSectionViewModelService },
    { provide: DataService, useClass: TransactionService }
  ]
})
export class TransactionListComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
