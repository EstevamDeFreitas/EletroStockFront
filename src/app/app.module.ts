import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { ErrorMsgComponent } from './shared/error-msg/error-msg.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './access/components/login/login.component';
import { CreateAccountComponent } from './access/components/create-account/create-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './customer/components/account/account.component';
import { DetailsComponent } from './customer/components/details/details.component';
import { PurchasesComponent } from './customer/components/purchases/purchases.component';
import { CuponsComponent } from './customer/components/cupons/cupons.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from './shared/custom-validators';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    AccountComponent,
    DetailsComponent,
    PurchasesComponent,
    CuponsComponent,
    ErrorMsgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    HttpClientModule,
    CustomValidators,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
