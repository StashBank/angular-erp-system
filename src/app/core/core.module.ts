import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { TranslateModule, TranslateService } from '@ngx-translate/core';


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
  MatProgressSpinnerModule,
} from '@angular/material';
import { BaseSectionComponent } from './base-section/base-section.component';
import { BasePageComponent } from './base-page/base-page.component';
import { AppTranslateService } from '../app-translate.service';
import { LookupDialogComponent } from './lookup-dialog/lookup-dialog.component';

import { environment } from '../../environments/environment';
import { BaseDetailComponent } from './components/base-detail/base-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
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
    MatProgressSpinnerModule,
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
    BaseDetailComponent,
  ],
  declarations: [BaseSectionComponent, BasePageComponent, LookupDialogComponent, BaseDetailComponent],
  entryComponents: [LookupDialogComponent],
  providers: [
    { provide: TranslateService, useClass: AppTranslateService }
  ]
})
export class CoreModule { }
