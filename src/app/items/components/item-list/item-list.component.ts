import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { BaseSectionViewModel } from 'src/app/core/view-models/base-section-view-model.service';
import { ItemSectionViewModelService } from '../../services/item-section-view-model.service';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  providers: [
    { provide: BaseSectionViewModel, useClass: ItemSectionViewModelService },
    { provide: DataService, useClass: ItemService }
  ]
})
export class ItemListComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
