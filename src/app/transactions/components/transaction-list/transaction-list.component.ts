import { Component, OnInit } from '@angular/core';
import { BaseSectionViewModel } from 'src/app/core/view-models/base-section-view-model.service';
import { TransactionSectionViewModelService } from '../../services/transaction-section-view-model.service';
import { DataService } from 'src/app/core/data.service';
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
