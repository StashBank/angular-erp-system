import { Component, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy  {

  @ViewChild('snav') snavRef: MatSidenav;

  mobileQuery: MediaQueryList;
  fillerContent = 'test';
  fillerNav: Array<{ title: string, path: string}> = [
    { title: 'Customers', path: 'customers' },
    { title: 'Stores', path: 'stores' },
    { title: 'Items', path: 'items' },
    { title: 'Stocks', path: 'stocks' },
    { title: 'Orders', path: 'orders' },
    { title: 'Transactions', path: 'transactions' },
  ];
  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  navLinkClick(route?: string) {
    if (this.mobileQuery.matches) {
      this.snavRef.close();
    }
    // this.router.navigate([route]);
  }
}
