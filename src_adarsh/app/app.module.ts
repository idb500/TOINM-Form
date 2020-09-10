import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToiFormComponent } from './toi-form/toi-form.component';
import { Toiform1Component } from './toiform1/toiform1.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ToiFormComponent,
    Toiform1Component,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
