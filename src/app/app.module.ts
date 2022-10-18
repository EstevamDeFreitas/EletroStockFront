import { ProductComponent } from './products/product/product.component';
import { CuponsConfigComponent } from './adm/config/cupons-config/cupons-config.component';
import { CardFlagComponent } from './adm/config/card-flag/card-flag.component';
import { CategoriesInativationsComponent } from './adm/config/categories-inativations/categories-inativations.component';
import { ProductsCategoriesComponent } from './adm/config/products-categories/products-categories.component';
import { PriceCategoriesComponent } from './adm/config/price-categories/price-categories.component';
import { ConfigurationComponent } from './adm/config/configuration/configuration.component';
import { NgCreditCardModule } from 'angular-credit-card';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountComponent } from './customer/components/account/account.component';
import { DetailsComponent } from './customer/components/details/details.component';
import { PurchasesComponent } from './customer/components/purchases/purchases.component';
import { CuponsComponent } from './customer/components/cupons/cupons.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from './shared/custom-validators';
import { DatePipe } from '@angular/common';
import { AccessInterceptor } from './access/services/access/access.interceptor';
import { ShoppingCartComponent } from './shopping-cart/components/shopping-cart/shopping-cart.component';
import { CartComponent } from './shopping-cart/components/cart/cart.component';
import { TransactionsComponent } from './adm/transactions/transactions/transactions.component';
import { ProductListingComponent } from './products/product-listing/product-listing.component';
import { RefundModalComponent } from './customer/components/refund-modal/refund-modal.component';



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
    ConfigurationComponent,
    PriceCategoriesComponent,
    ProductsCategoriesComponent,
    CuponsConfigComponent,
    CategoriesInativationsComponent,
    CardFlagComponent,
    ProductComponent,
    ShoppingCartComponent,
    CartComponent,
    TransactionsComponent,
    ProductListingComponent,
    RefundModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgCreditCardModule,
    NgbModalModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    HttpClientModule,
    CustomValidators,
    DatePipe,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AccessInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
