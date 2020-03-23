import { BaseSectionViewModel } from '../../core/view-models/base-section-view-model.service';
import { Injectable, Inject, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContractorSectionViewModelService extends BaseSectionViewModel {

  displayedColumns: string[] = ['number', 'name', 'phone', 'email', 'address', 'menu'];
  entitySchemaName = 'Contractor';

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }

}
