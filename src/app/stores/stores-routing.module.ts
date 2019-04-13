import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreListComponent } from './components/store-list/store-list.component';
import { StorePageComponent } from './components/store-page/store-page.component';

const routes: Routes = [
  { path: '', component: StoreListComponent, pathMatch: 'full' },
  { path: 'new', component: StorePageComponent },
  { path: 'edit/:id', component: StorePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoresRoutingModule {}
