import { Injectable, Inject, Injector } from '@angular/core';
import { BaseSectionViewModel } from '../../core/view-models/base-section-view-model.service';

@Injectable()
export class ItemSectionViewModelService extends BaseSectionViewModel {

  entitySchemaName = 'Item';
  displayedColumns: string[] = ['name', 'code', 'barCode', 'price', 'contractor', 'menu'];

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }

}
