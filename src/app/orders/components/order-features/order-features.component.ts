import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

import { OrderFeaturesViewModelService } from '../../services/order-features-view-model.service';
import { BaseDetailViewModelService } from 'src/app/core/view-models/base-detail-view-model.service';

@Component({
  selector: 'app-order-features',
  templateUrl: './order-features.component.html',
  styleUrls: ['./order-features.component.css'],
  providers: [
    OrderFeaturesViewModelService,
    { provide: BaseDetailViewModelService, useExisting: OrderFeaturesViewModelService },
  ]
})
export class OrderFeaturesComponent implements OnInit {

  @Input()
  formArray: FormArray;

  constructor(private vm: OrderFeaturesViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
