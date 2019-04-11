import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList: Array<Customer>;
  displayedColumns: string[] = ['name', 'phone', 'address', 'menu'];

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getAll().subscribe(customers => this.customerList = customers);
  }

  edit(customer: Customer) {
    this.router.navigate(['edit', customer.id], { relativeTo: this.route});
  }

  remove(customer: Customer) {
    this.customerService.remove(customer.id).subscribe(() => null);
  }

}
