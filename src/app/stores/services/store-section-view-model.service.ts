import { Injectable, Inject, Injector } from '@angular/core';
import { BaseSectionViewModel } from '../../core/view-models/base-section-view-model.service';

@Injectable()
export class StoreSectionViewModelService extends BaseSectionViewModel {

  entitySchemaName = 'Store';
  displayedColumns: string[] = ['name', 'code', 'phone', 'address', 'menu'];

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }

}
