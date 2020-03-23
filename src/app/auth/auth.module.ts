import { NgModule, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CoreModule, HttpLoaderFactory } from '../core/core.module';
import { CoreTranslateService } from '../core/translate.service';

@NgModule({
  declarations: [AuthComponent, LoginComponent, ProfileComponent],
  imports: [
    CoreModule,
    AuthRoutingModule,
    TranslateModule.forChild({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
    }),
  ],
  providers: [
    { provide: TranslateService, useExisting: CoreTranslateService }
  ],
})
export class AuthModule { }
