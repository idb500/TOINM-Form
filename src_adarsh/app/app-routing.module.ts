import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToiFormComponent } from './toi-form/toi-form.component';
import { Toiform1Component } from './toiform1/toiform1.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  {path: '1', component:ToiFormComponent},
  {path: '', component:Toiform1Component},
  {path:'submit', component:ThankYouComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
