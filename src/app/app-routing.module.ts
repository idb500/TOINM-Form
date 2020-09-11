import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToiFormComponent } from './toi-form/toi-form.component';
import { Toiform1Component } from './toiform1/toiform1.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { DocumentexistsComponent } from './documentexists/documentexists.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { LinkExpireComponent } from './link-expire/link-expire.component';

const routes: Routes = [
  // {path: '1', component:ToiFormComponent},
  {path: '', component:Toiform1Component},
  {path:'submit', component:ThankYouComponent},
  { path:'doc', component:DocumentexistsComponent},
  {path:'pageNotFound', component:ErrorpageComponent},
  {path:'linkExpire', component:LinkExpireComponent},
  {path:'2', component:ToiFormComponent},
  { path: '**', redirectTo: 'pageNotFound' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
