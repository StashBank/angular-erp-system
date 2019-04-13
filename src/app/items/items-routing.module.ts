import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemPageComponent } from './components/item-page/item-page.component';

const routes: Routes = [
  { path: '', component: ItemListComponent, pathMatch: 'full' },
  { path: 'new', component: ItemPageComponent },
  { path: 'edit/:id', component: ItemPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
