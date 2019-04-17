import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {

  private currentLang$ = new BehaviorSubject<string>(this.translate.currentLang || this.translate.defaultLang);

  public get currentLang(): string {
    return this.currentLang$.value;
  }

  public get currentLangChanged(): Observable<string> {
    return this.currentLang$.asObservable();
  }

  constructor(private translate: TranslateService) {
    translate.onLangChange.subscribe(
      (langChangeEvt: LangChangeEvent) => this.currentLang$.next(langChangeEvt.lang)
    );
  }
}
