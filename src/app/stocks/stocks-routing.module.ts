import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockPageComponent } from './components/stock-page/stock-page.component';

const routes: Routes = [
  { path: '', component: StockListComponent, pathMatch: 'full' },
  { path: 'new', component: StockPageComponent },
  { path: 'edit/:id', component: StockPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocksRoutingModule {}
