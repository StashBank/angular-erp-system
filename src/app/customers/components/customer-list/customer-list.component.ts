import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { MatTableDataSource } from '@angular/material';
import { BaseSectionViewModel } from 'src/app/core/view-models/base-section-view-model.service';
import { CustomerSectionViewModelService } from '../../services/customer-section-view-model.service';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [
    { provide: BaseSectionViewModel, useClass: CustomerSectionViewModelService },
    { provide: DataService, useClass: CustomerService }
  ]
})
export class CustomerListComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
