import { Component, OnInit } from '@angular/core';

import { DataService } from '../../../core/data.service';
import { BaseSectionViewModel } from '../../../core/view-models/base-section-view-model.service';

import { ContractorSectionViewModelService } from '../../services/contractor-section-view-model.service';
import { ContractorService } from '../../services/contractor.service';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css'],
  providers: [
    { provide: BaseSectionViewModel, useClass: ContractorSectionViewModelService },
    { provide: DataService, useClass: ContractorService }
  ]
})
export class ContractorListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
