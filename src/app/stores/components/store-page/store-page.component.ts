import { Component, OnInit } from '@angular/core';
import { StoreViewModelService } from '../../services/store-view-model.service';
import { DataService } from '../../../core/data.service';
import { StoreService } from '../../services/store.service';
import { BasePageViewModel } from 'src/app/core/view-models/base-page-view-model.service';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css'],
  providers: [
    StoreViewModelService,
    { provide: BasePageViewModel, useExisting: StoreViewModelService },
    { provide: DataService, useClass: StoreService }
  ]
})
export class StorePageComponent implements OnInit {

  constructor(public vm: StoreViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
