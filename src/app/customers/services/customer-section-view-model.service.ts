import { BaseSectionViewModel } from 'src/app/core/view-models/base-section-view-model.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerSectionViewModelService extends BaseSectionViewModel {

  displayedColumns: string[] = ['number', 'name', 'phone', 'email', 'address', 'menu'];
  entitySchemaName = 'Customers';

}
