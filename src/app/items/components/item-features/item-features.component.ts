import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BaseDetailViewModelService } from '../../../core/view-models/base-detail-view-model.service';
import { ItemFeaturesViewModelService } from '../../services/item-features-view-model.service';

@Component({
  selector: 'app-item-features',
  templateUrl: './item-features.component.html',
  styleUrls: ['./item-features.component.css'],
  providers: [
    ItemFeaturesViewModelService,
    { provide: BaseDetailViewModelService, useExisting: ItemFeaturesViewModelService },
  ]
})
export class ItemFeaturesComponent implements OnInit {

  @Input()
  formArray: FormArray;

  constructor(private vm: ItemFeaturesViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
