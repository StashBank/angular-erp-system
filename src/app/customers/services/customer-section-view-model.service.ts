import { BaseSectionViewModel } from '../../core/view-models/base-section-view-model.service';
import { Injectable, Inject, Injector } from '@angular/core';

@Injectable()
export class CustomerSectionViewModelService extends BaseSectionViewModel {

  displayedColumns: string[] = ['number', 'name', 'phone', 'email', 'address', 'menu'];
  entitySchemaName = 'Customer';

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }

}
