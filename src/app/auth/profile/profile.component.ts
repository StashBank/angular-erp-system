import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  get profile() {
    return this.authSvc.profile;
  }

  constructor(
    private authSvc: AuthService,
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.authSvc.signOut().subscribe();
  }

}
