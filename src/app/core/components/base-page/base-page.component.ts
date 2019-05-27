import { Component, OnInit, Output, EventEmitter, Input, Optional } from '@angular/core';
import { Location } from '@angular/common';

import { BasePageViewModel } from '../../view-models/base-page-view-model.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit {

  @Input() saveButtonDisabled: boolean;
  @Input() saveButtonHidden: boolean;

  @Output() save = new EventEmitter();

  constructor(
    @Optional() public vm: BasePageViewModel,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  onBackButtonClick() {
    this.location.back();
  }

  onSaveButtonClick() {
    this.save.next();
  }

}
