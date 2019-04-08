import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy  {

  mobileQuery: MediaQueryList;
  fillerContent = 'test';
  fillerNav: Array<{ title: string, path: string}> = [
    { title: 'Customers', path: 'customers' },
    { title: 'Stores', path: 'stores' },
    { title: 'Items', path: 'items' },
    { title: 'Stocks', path: 'stocks' },
    { title: 'Orders', path: 'Orders' },
    { title: 'Transactions', path: 'transactions' },
  ];
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private snackBar: MatSnackBar
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
