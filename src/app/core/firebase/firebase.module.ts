import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

declare const firebase: any;

const firebaseDefaultApp = firebase.app();

export const FIRESTORE_INJECTION_TOKEN = new InjectionToken<firebase.firestore.Firestore>('firestore', {
  providedIn: 'root',
  factory: () => firebaseDefaultApp.firestore()
});

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class FirebaseModule {}
