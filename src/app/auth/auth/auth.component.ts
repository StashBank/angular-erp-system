import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  get loggedIn(): boolean {
    return this.authSvc.profile !== null;
  }

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

}
