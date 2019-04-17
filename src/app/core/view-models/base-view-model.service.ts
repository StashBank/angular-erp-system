import { ChangeDetectorRef, Injector, Type } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from 'src/app/app.service';

export abstract class BaseViewModel {

  abstract entitySchemaName: string;

  public form: FormGroup;
  public id: string;

  protected appService: AppService;
  protected mobileQuery: MediaQueryList;
  protected translate: TranslateService;
  protected formBuilder: FormBuilder;
  protected route: ActivatedRoute;
  protected router: Router;
  protected location: Location;

  private mobileQueryListener: (ev: MediaQueryListEvent) => void;

  public get isMobile(): boolean {
    return this.mobileQuery && this.mobileQuery.matches;
  }

  // abstract get subTitle$(): Observable<string>;

  constructor(
    private injector: Injector,
    ) {
    this.setUpDeps();

    const changeDetectorRef = this.injector.get(ChangeDetectorRef);
    const media = this.injector.get(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = _ => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
    this.translate.setDefaultLang(this.appService.currentLang);
    this.appService.currentLangChanged.subscribe(lang => this.translate.use(lang));
  }

  // abstract init();
  // abstract createForm();
  // abstract save();
  // abstract loadEntity();

  public dispose() {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  private setUpDeps() {
    this.appService = this.injector.get(AppService);
    this.translate = this.injector.get(TranslateService);
    this.formBuilder = this.injector.get(FormBuilder);
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.location = this.injector.get(Location);
  }
}
