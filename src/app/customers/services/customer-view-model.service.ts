import { Injectable, ChangeDetectorRef } from '@angular/core';
import { BaseViewModel } from '../../core/view-models/base-view-model.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../models/customer';
import { CustomerType } from '../enums/customer-type.enum';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { Location } from '@angular/common';

@Injectable()
export class CustomerViewModelService extends BaseViewModel {

  entitySchemaName: 'customers';
  form: FormGroup;
  id: string;
  customer: Customer;
  customerTypes: Array<{ name: string, value: string }> = [
    { value: CustomerType.Company.toString(), name: 'Company' },
    { value: CustomerType.Person.toString(), name: 'Person' },
  ];

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.customer && this.customer.name })
      : this.translate.get('common.create-new');
  }
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    translate: TranslateService,
    formBuilder: FormBuilder,
    route: ActivatedRoute,
    router: Router,
    location: Location,
    protected customerService: CustomerService
    ) {
    super(changeDetectorRef, media, translate, formBuilder, route, router, location);
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      type: null,
      phone: null,
      address: null,
      notes: null
    });
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
