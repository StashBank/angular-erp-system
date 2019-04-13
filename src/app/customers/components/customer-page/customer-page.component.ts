import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';
import { CustomerType } from '../../enums/customer-type.enum';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {

  form: FormGroup;
  id: string;
  customer: Customer;
  customerTypes: Array<{ name: string, value: string }> = [
    { value: CustomerType.Company.toString(), name: 'Company' },
    { value: CustomerType.Person.toString(), name: 'Person' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private location: Location
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      const { id } = params;
      if (id && id !== this.id) {
        this.id = id;
        this.loadCustomer(id);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: null,
      phone: null,
      address: null,
      extras: null
    });
  }

  save() {
    if (this.id) {
      this.customerService.update(this.id, this.form.value).subscribe(() => null);
      return;
    }
    this.customerService.create(this.form.value)
      .subscribe(
        // id => this.router.navigate(['..', 'edit', id], { relativeTo: this.route })
        id => this.location.replaceState(`customers/edit/${id}`)
      );
  }

  loadCustomer(id: string) {
    this.customerService.getById(id).subscribe(customer => {
      this.customer = customer;
      this.form.patchValue(customer);
    });
  }

}
