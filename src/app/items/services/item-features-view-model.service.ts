import { Injectable, Inject, Injector } from '@angular/core';
import { BaseDetailViewModelService } from '../../core/view-models/base-detail-view-model.service';
import { Observable } from 'rxjs';

@Injectable()
export class ItemFeaturesViewModelService extends BaseDetailViewModelService {

  entitySchemaName = 'ItemFeature';
  visibleFields = ['name', 'value'];

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }

}
