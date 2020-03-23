import { Injectable, Inject, Injector } from '@angular/core';
import { BaseDetailViewModelService } from 'src/app/core/view-models/base-detail-view-model.service';

@Injectable({
  providedIn: 'root'
})
export class OrderFeaturesViewModelService extends BaseDetailViewModelService {

  entitySchemaName = 'OrderFeature';
  visibleFields = ['name', 'value'];

  constructor(@Inject(Injector) injector: Injector) {
    super(injector);
  }

}
