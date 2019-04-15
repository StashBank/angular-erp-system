import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

export abstract class BaseViewModel {

  abstract entitySchemaName: string;
  // abstract form: FormGroup;
  // abstract id: string;

  protected mobileQuery: MediaQueryList;

  private mobileQueryListener: (ev: MediaQueryListEvent) => void;

  public get isMobile(): boolean {
    return this.mobileQuery && this.mobileQuery.matches;
  }

  // abstract get subTitle$(): Observable<string>;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    protected translate: TranslateService,
    protected formBuilder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected location: Location,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = _ => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.translate.setDefaultLang('en-US');
  }

  // abstract init();
  // abstract createForm();
  // abstract save();
  // abstract loadEntity();

  public dispose() {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
}
