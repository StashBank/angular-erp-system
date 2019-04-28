import { Injectable, Injector } from '@angular/core';
import { BaseViewModel } from '../../core/view-models/base-view-model.service';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerType } from '../enums/customer-type.enum';
import { CustomerService } from './customer.service';

@Injectable()
export class CustomerViewModelService extends BaseViewModel {

  protected entitySchemaName = 'Customer';
  protected entity: Customer;

  customerTypes: Array<{ name: string, value: string }> = [
    { value: CustomerType.Company.toString(), name: 'customers.enums.type.company' },
    { value: CustomerType.Person.toString(), name: 'customers.enums.type.person' },
  ];

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.name })
      : this.translate.get('common.create-new');
  }

  constructor(injector: Injector, protected customerService: CustomerService) {
    super(injector);
  }

}
