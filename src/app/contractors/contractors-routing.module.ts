import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractorListComponent } from './components/contractor-list/contractor-list.component';
import { ContractorPageComponent } from './components/contractor-page/contractor-page.component';

const routes: Routes = [
  { path: '', component: ContractorListComponent, pathMatch: 'full' },
  { path: 'new', component: ContractorPageComponent },
  { path: 'edit/:id', component: ContractorPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractorsRoutingModule {}
