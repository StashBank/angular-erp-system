import { Injectable } from '@angular/core';
import { BaseSectionViewModel } from 'src/app/core/view-models/base-section-view-model.service';

@Injectable()
export class StoreSectionViewModelService extends BaseSectionViewModel {

  entitySchemaName = 'Store';
  displayedColumns: string[] = ['name', 'code', 'phone', 'address', 'menu'];

}
