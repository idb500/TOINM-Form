import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToiFormComponent } from './toi-form/toi-form.component';
import { Toiform1Component } from './toiform1/toiform1.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DocumentexistsComponent } from './documentexists/documentexists.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { LinkExpireComponent } from './link-expire/link-expire.component';
@NgModule({
  declarations: [
    AppComponent,
    ToiFormComponent,
    Toiform1Component,
    ThankYouComponent,
    DocumentexistsComponent,
    ErrorpageComponent,
    LinkExpireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
