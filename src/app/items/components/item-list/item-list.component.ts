import { Component, OnInit } from '@angular/core';

import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  itemList: Array<Item>;
  displayedColumns: string[] = ['name', 'code', 'price', 'description'];

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getAll().subscribe(items => this.itemList = items);
  }

}
