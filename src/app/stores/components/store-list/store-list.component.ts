import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  storeList: Array<Store>;
  displayedColumns: string[] = ['name', 'code', 'phone', 'address', 'menu'];

  constructor(
    private storeService: StoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadStores();
  }

  loadStores() {
    this.storeService.getAll().subscribe(stores => this.storeList = stores);
  }

  edit(store: Store) {
    this.router.navigate(['edit', store.id], { relativeTo: this.route});
  }

  remove(store: Store) {
    this.storeService.remove(store.id).subscribe(() => null);
  }

}
