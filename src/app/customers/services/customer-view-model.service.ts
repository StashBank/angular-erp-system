import { Injectable, Injector, Inject } from '@angular/core';
import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerType } from '../enums/customer-type.enum';
import { CustomerService } from './customer.service';

@Injectable()
export class CustomerViewModelService extends BasePageViewModel {

  protected entitySchemaName = 'Customer';
  protected entity = new Customer();

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.name })
      : this.translate.get('common.create-new');
  }

  constructor(@Inject(Injector) injector: Injector, protected customerService: CustomerService) {
    super(injector);
  }

}
