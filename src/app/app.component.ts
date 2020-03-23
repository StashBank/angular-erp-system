import { Component, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSidenav, SELECT_MULTIPLE_PANEL_PADDING_X } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnDestroy {

  @ViewChild('snav', { static: true }) snavRef: MatSidenav;

  mobileQuery: MediaQueryList;
  fillerContent = 'test';
  fillerNav: Array<{ title: string, path: string}> = [
    { title: 'common.menu.customers', path: 'customers' },
    { title: 'common.menu.contractors', path: 'contractors' },
    { title: 'common.menu.orders', path: 'orders' },
    { title: 'common.menu.items', path: 'items' },
    { title: 'common.menu.stores', path: 'stores' },
    { title: 'common.menu.stocks', path: 'stocks' },
    { title: 'common.menu.transactions', path: 'transactions' },
    { title: 'common.menu.profile', path: 'profile' },
  ];
  langs: Array<{ title: string, value: string }> = [
    { title: 'EN', value: 'en-US' },
    { title: 'UA', value: 'ua-UK' },
    { title: 'RU', value: 'ru-RU' },
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
    this.setUpLang();
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

  setUpLang() {
    let lang = 'en-US';
    if (localStorage) {
      const prefLang = localStorage.getItem('lang');
      if (prefLang) {
        lang = prefLang;
        this.translate.use(lang);
      }
    }
    this.translate.setDefaultLang('en-US');
    this.langControl.setValue(lang);
    this.langControl.valueChanges.subscribe(l => this.onLangChange(l));
  }

  onLangChange(lang: string) {
    if (localStorage) {
      localStorage.setItem('lang', lang);
    }
    this.translate.use(lang);
  }
}
