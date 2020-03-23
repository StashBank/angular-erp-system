import { InjectionToken } from '@angular/core';

declare const firebase: any;

export const AUTH_PROVIDER_INJECTION_TOKEN = new InjectionToken<firebase.auth.AuthProvider>('auth_provider', {
  providedIn: 'root',
  factory: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    return provider;
  }
});
