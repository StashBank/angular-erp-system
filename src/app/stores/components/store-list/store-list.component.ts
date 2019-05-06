import { Component, OnInit } from '@angular/core';
import { BaseSectionViewModel } from 'src/app/core/view-models/base-section-view-model.service';
import { StoreSectionViewModelService } from '../../services/store-section-view-model.service';
import { DataService } from 'src/app/core/data.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css'],
  providers: [
    { provide: BaseSectionViewModel, useClass: StoreSectionViewModelService },
    { provide: DataService, useClass: StoreService }
  ]
})
export class StoreListComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }


}
