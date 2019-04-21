import { Injectable, Injector } from '@angular/core';
import { BaseViewModel } from '../../core/view-models/base-view-model.service';
import { Observable } from 'rxjs';
import { Validators } from '@angular/forms';
import { Customer } from '../models/customer';
import { CustomerType } from '../enums/customer-type.enum';
import { CustomerService } from './customer.service';

@Injectable()
export class CustomerViewModelService extends BaseViewModel {

  entitySchemaName: 'customers';
  customer: Customer;
  customerTypes: Array<{ name: string, value: string }> = [
    { value: CustomerType.Company.toString(), name: 'customers.enums.type.company' },
    { value: CustomerType.Person.toString(), name: 'customers.enums.type.person' },
  ];

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.customer && this.customer.name })
      : this.translate.get('common.create-new');
  }

  constructor(injector: Injector, protected customerService: CustomerService) {
    super(injector);
  }

  init() {
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
      number: { value: null, disabled: true},
      name: [null, [Validators.required]],
      type: null,
      phone: null,
      email: null,
      address: null,
      notes: null
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
