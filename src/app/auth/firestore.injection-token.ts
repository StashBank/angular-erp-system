import { InjectionToken } from '@angular/core';

declare const firebase: any;

const firebaseDefaultApp = firebase.app();

export const FIRESTORE_INJECTION_TOKEN = new InjectionToken<firebase.firestore.Firestore>('firestore', {
  providedIn: 'root',
  factory: () => firebaseDefaultApp.firestore()
});
