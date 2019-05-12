import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BaseDetailViewModelService } from '../../view-models/base-detail-view-model.service';

@Component({
  selector: 'app-base-detail',
  templateUrl: './base-detail.component.html',
  styleUrls: ['./base-detail.component.css']
})
export class BaseDetailComponent implements OnInit {

  @Input()
  formArray: FormArray;

  constructor(public vm: BaseDetailViewModelService) { }

  ngOnInit() {
    this.vm.formArray = this.formArray;
  }

}
