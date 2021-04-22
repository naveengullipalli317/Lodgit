import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckInComponent } from './check-in/check-in.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { StartComponent } from './start/start.component';
const routes: Routes = [
  { path: 'home', component: StartComponent },
  { path: 'check-in', component: CheckInComponent },
  { path: 'check-out', component: CheckoutComponent }
];
@NgModule({

  declarations: [
    AppComponent,
    CheckInComponent,
    NotFoundComponent,
    CheckoutComponent,
    StartComponent
  ],
  imports: [
    [RouterModule.forRoot(routes)],
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
