import { Component, OnInit } from '@angular/core';
import { StoreViewModelService } from '../../services/store-view-model.service';

@Component({
  selector: 'app-store-page',
  templateUrl: './store-page.component.html',
  styleUrls: ['./store-page.component.css'],
  providers: [
    StoreViewModelService
  ]
})
export class StorePageComponent implements OnInit {

  constructor(public vm: StoreViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

}
