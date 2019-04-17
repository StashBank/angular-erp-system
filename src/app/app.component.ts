import { Component, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy {

  @ViewChild('snav') snavRef: MatSidenav;

  mobileQuery: MediaQueryList;
  fillerContent = 'test';
  fillerNav: Array<{ title: string, path: string}> = [
    { title: 'common.menu.customers', path: 'customers' },
    { title: 'common.menu.stores', path: 'stores' },
    { title: 'common.menu.items', path: 'items' },
    { title: 'common.menu.stocks', path: 'stocks' },
    { title: 'common.menu.orders', path: 'orders' },
    { title: 'common.menu.transactions', path: 'transactions' },
  ];
  langs: Array<{ title: string, value: string }> = [
    { title: 'EN-US', value: 'en-US' },
    { title: 'UA-UK', value: 'ua-UK' },
  ];
  langControl = new FormControl();

  private mobileQueryListener: (ev: MediaQueryListEvent) => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = _ => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    translate.setDefaultLang('en-US');
    this.langControl.setValue('en-US');
    this.langControl.valueChanges.subscribe(lang => this.onLangChange(lang));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  navLinkClick() {
    if (this.mobileQuery.matches) {
      this.snavRef.close();
    }
  }

  onLangChange(lang: string) {
    this.translate.use(lang);
  }
}
