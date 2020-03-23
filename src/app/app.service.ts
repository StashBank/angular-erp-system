import { Injectable, ApplicationRef } from '@angular/core';
import { BehaviorSubject, interval, concat } from 'rxjs';
// import { Platform } from '@angular/cdk/platform';
// import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppService {

  public loading$ = new BehaviorSubject<boolean>(false);
  get loading(): boolean {
    return this.loading$.getValue();
  }
  set loading(value: boolean) {
    this.loading$.next(value);
  }

  public mobileView$ = new BehaviorSubject<boolean>(false);
  get mobileView(): boolean {
    return this.mobileView$.value;
  }
  set mobileView(value: boolean) {
    this.mobileView$.next(value);
  }

  /*get touchUI(): boolean {
    return this.platform.ANDROID || this.platform.IOS;
  }*/

  public newVersionAvailable$ = new BehaviorSubject<boolean>(false);
  get newVersionAvailable(): boolean {
    return this.newVersionAvailable$.getValue();
  }

  constructor(
    // public platform: Platform,
    // private updates: SwUpdate,
    appRef: ApplicationRef
  ) {
    /*const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const intervalMs = 45 * 60 * 10000; // 45 minutes
    const interval$ = interval(intervalMs); // every 15 minutes
    const intervalAppIsStable$ = concat(appIsStable$, interval$);
    if (updates.isEnabled) {
      intervalAppIsStable$.subscribe(() => updates.checkForUpdate());
    }
    updates.available.subscribe(_ => this.newVersionAvailable$.next(true));*/
  }

  installUpdates() {
    /*if (!this.updates.isEnabled) {
      return;
    }
    this.updates.activateUpdate()
    .then(
      () => document.location.reload()
    );*/
  }

}
