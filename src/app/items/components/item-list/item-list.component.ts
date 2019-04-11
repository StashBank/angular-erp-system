import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  itemList: Array<Item>;
  displayedColumns: string[] = ['name', 'code', 'price', 'description', 'menu'];

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getAll().subscribe(items => this.itemList = items);
  }

  edit(item: Item) {
    this.router.navigate(['edit', item.id], { relativeTo: this.route});
  }

  remove(item: Item) {
    this.itemService.remove(item.id).subscribe(() => null);
  }

}
