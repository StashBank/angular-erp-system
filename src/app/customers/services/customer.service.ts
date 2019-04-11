import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Customer } from '../models/customer';

@Injectable({ providedIn: 'root' })
export class CustomerService extends DataService<Customer> {

  collectionName = 'customers';

}
