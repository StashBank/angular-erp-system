import { BaseSectionViewModel } from '../../view-models/base-section-view-model.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-section',
  templateUrl: './base-section.component.html',
  styleUrls: ['./base-section.component.css']
})
export class BaseSectionComponent implements OnInit {

  constructor(
    public vm: BaseSectionViewModel
  ) { }

  ngOnInit() {
    this.vm.init();
  }

}
