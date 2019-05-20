import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService } from '../../../core/data.service';
import { ContractorViewModelService } from '../../services/contractor-view-model.service';
import { ContractorService } from '../../services/contractor.service';

@Component({
  selector: 'app-contractor-page',
  templateUrl: './contractor-page.component.html',
  styleUrls: ['./contractor-page.component.css'],
  providers: [
    ContractorViewModelService,
    { provide: DataService, useExisting: ContractorService }
  ]
})
export class ContractorPageComponent implements OnInit, OnDestroy {

  constructor(public vm: ContractorViewModelService) { }

  ngOnInit() {
    this.vm.init();
  }

  ngOnDestroy() {
    this.vm.dispose();
  }

}
