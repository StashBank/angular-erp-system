import { Injectable, Injector, Inject } from '@angular/core';
import { BasePageViewModel } from '../../core/view-models/base-page-view-model.service';
import { Observable } from 'rxjs';
import { Contractor } from '../models/contractor';
import { ContractorService } from './contractor.service';

@Injectable()
export class ContractorViewModelService extends BasePageViewModel {

  protected entitySchemaName = 'Contractor';
  protected entity = new Contractor();

  public get subTitle$(): Observable<string> {
    return this.id
      ? this.translate.get('common.edit', { value: this.entity && this.entity.name })
      : this.translate.get('common.create-new');
  }

  constructor(@Inject(Injector) injector: Injector, protected contractorService: ContractorService) {
    super(injector);
  }

}
