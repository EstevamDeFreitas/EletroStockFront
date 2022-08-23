import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './access/components/login/login.component';
import { CreateAccountComponent } from './access/components/create-account/create-account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountComponent } from './customer/components/account/account.component';
import { DetailsComponent } from './customer/components/details/details.component';
import { PurchasesComponent } from './customer/components/purchases/purchases.component';
import { CuponsComponent } from './customer/components/cupons/cupons.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    AccountComponent,
    DetailsComponent,
    PurchasesComponent,
    CuponsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
