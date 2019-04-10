import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit {

  @Input() saveButtonDisabled: boolean;

  @Output() save = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSaveButtonClick() {
    this.save.next();
  }

}
