import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-section',
  templateUrl: './base-section.component.html',
  styleUrls: ['./base-section.component.css']
})
export class BaseSectionComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onNewButtonClick() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
