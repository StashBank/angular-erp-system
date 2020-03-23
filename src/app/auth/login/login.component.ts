import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppService } from 'src/app/app.service';
import { take, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private authSvc: AuthService,
    private appSvc: AppService,
  ) { }

  ngOnInit() {
  }

  onLoginClick() {
    this.authSvc.logIn()
    .pipe(
      take(1),
    )
    .subscribe(
      userCredential => null,
      e => console.error(e)
    );
  }

}
