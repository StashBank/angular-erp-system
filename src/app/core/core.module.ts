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
import { BaseSectionComponent } from './components/base-section/base-section.component';
import { BasePageComponent } from './components/base-page/base-page.component';
import { AppTranslateService } from '../app-translate.service';
import { LookupDialogComponent } from './components/lookup-dialog/lookup-dialog.component';

import { environment } from '../../environments/environment';
import { BaseDetailComponent } from './components/base-detail/base-detail.component';
import { LookupControlComponent } from './components/lookup-control/lookup-control.component';
import { DropDownControlComponent } from './components/drop-down-control/drop-down-control.component';

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
    LookupControlComponent,
    DropDownControlComponent,
  ],
  declarations: [
    BaseSectionComponent,
    BasePageComponent,
    LookupDialogComponent,
    BaseDetailComponent,
    LookupControlComponent,
    DropDownControlComponent,
  ],
  entryComponents: [LookupDialogComponent],
  providers: [
    { provide: TranslateService, useClass: AppTranslateService }
  ]
})
export class CoreModule { }
