import { BaseSectionViewModel } from 'src/app/core/view-models/base-section-view-model.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { BaseModel } from '../models/base.model';

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
