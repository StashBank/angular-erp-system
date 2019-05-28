import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerViewModelService } from '../../services/customer-view-model.service';
import { DataService } from '../../../core/data.service';
import { CustomerService } from '../../services/customer.service';
import { BasePageViewModel } from 'src/app/core/view-models/base-page-view-model.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css'],
  providers: [
    CustomerViewModelService,
    { provide: BasePageViewModel, useExisting: CustomerViewModelService },
    { provide: DataService, useExisting: CustomerService }
  ]
})
export class CustomerPageComponent implements OnInit, OnDestroy {

  constructor(
    public vm: CustomerViewModelService,
  ) {}

  ngOnInit() {
    this.vm.init();
  }

  ngOnDestroy() {
    this.vm.dispose();
  }

}
