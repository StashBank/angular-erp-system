import { BaseSectionViewModel } from '../../view-models/base-section-view-model.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-base-section',
  templateUrl: './base-section.component.html',
  styleUrls: ['./base-section.component.css']
})
export class BaseSectionComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public vm: BaseSectionViewModel
  ) { }

  ngOnInit() {
    this.vm.init();
    this.vm.sort = this.sort;
  }

}
