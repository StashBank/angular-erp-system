import { Injectable } from '@angular/core';
import { BaseSectionViewModel } from 'src/app/core/view-models/base-section-view-model.service';

@Injectable()
export class TransactionSectionViewModelService extends BaseSectionViewModel {

  entitySchemaName = 'Transaction';
  displayedColumns: string[] = ['type', 'status', 'from', 'to', 'date', 'qty', 'menu'];
  saveButtonHidden = true;

}
