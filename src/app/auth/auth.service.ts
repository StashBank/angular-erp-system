import { Injectable, Inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AUTH_PROVIDER_INJECTION_TOKEN } from './auth_provider.injection-token';
import { FIRESTORE_INJECTION_TOKEN } from './firestore.injection-token';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {

  private get auth() {
    return this.firestore.app.auth();
  }
  get profile() {
    return this.auth.currentUser;
  }
  constructor(
    @Inject(FIRESTORE_INJECTION_TOKEN) protected firestore: firebase.firestore.Firestore,
    @Inject(AUTH_PROVIDER_INJECTION_TOKEN) protected provider: firebase.auth.AuthProvider,
    private snackbar: MatSnackBar
  ) {}

  logIn(): Observable<firebase.auth.UserCredential> {
    return from(
      this.auth.signInWithPopup(this.provider)
    ).pipe(
      catchError((err, caught) => {
        this.snackbar.open(err.message);
        console.error(err);
        return caught;
      })
    );
  }

  signOut() {
    return from(this.auth.signOut());
  }

  getUsers() {
  }
}
