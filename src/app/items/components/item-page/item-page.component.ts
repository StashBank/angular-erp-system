import { Component, OnInit } from '@angular/core';

import { ItemViewModelService } from '../../services/item-view-model.service';
import { DataService } from '../../../core/data.service';
import { ItemService } from '../../services/item.service';
import { BasePageViewModel } from 'src/app/core/view-models/base-page-view-model.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
  providers: [
    ItemViewModelService,
    { provide: BasePageViewModel, useExisting: ItemViewModelService },
    { provide: DataService, useExisting: ItemService }
  ]
})
export class ItemPageComponent implements OnInit {

  constructor(public vm: ItemViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
