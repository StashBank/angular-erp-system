import { Component, OnInit } from '@angular/core';

import { ItemViewModelService } from '../../services/item-view-model.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
  providers: [
    ItemViewModelService
  ]
})
export class ItemPageComponent implements OnInit {

  constructor(public vm: ItemViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
