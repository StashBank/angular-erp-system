import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { environment } from '../../environments/environment';

import {
  MatButtonModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatTableModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatSelectModule,
  MatDialogModule,
  MatExpansionModule,
} from '@angular/material';
import { BaseSectionComponent } from './base-section/base-section.component';
import { BasePageComponent } from './base-page/base-page.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppTranslateService } from '../app-translate.service';
import { LookupDialogComponent } from './lookup-dialog/lookup-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    TranslateModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,

    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,

    AngularFireModule,
    AngularFirestoreModule,

    BaseSectionComponent,
    BasePageComponent,
    LookupDialogComponent,
  ],
  declarations: [BaseSectionComponent, BasePageComponent, LookupDialogComponent],
  entryComponents: [LookupDialogComponent],
  providers: [
    { provide: TranslateService, useClass: AppTranslateService }
  ]
})
export class CoreModule { }
