import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToiFormComponent } from './toi-form/toi-form.component';

import { ThankYouComponent } from './thank-you/thank-you.component';
import { DocumentexistsComponent } from './documentexists/documentexists.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { LinkExpireComponent } from './link-expire/link-expire.component';
import { Toiform1Component } from './number-magic/toiform1.component';

const routes: Routes = [
  {path: '', component:Toiform1Component},
  {path:'thank-you', component:ThankYouComponent},
  { path:'duplicate-entry', component:DocumentexistsComponent},
  {path:'404', component:ErrorpageComponent},
  {path:'linkExpire', component:LinkExpireComponent},
  { path: '**', redirectTo: '404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
