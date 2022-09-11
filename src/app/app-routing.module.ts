import { CuponsConfigComponent } from './adm/config/cupons-config/cupons-config.component';
import { CategoriesInativationsComponent } from './adm/config/categories-inativations/categories-inativations.component';
import { PriceCategoriesComponent } from './adm/config/price-categories/price-categories.component';
import { ProductsCategoriesComponent } from './adm/config/products-categories/products-categories.component';
import { CardFlagComponent } from './adm/config/card-flag/card-flag.component';
import { ConfigurationComponent } from './adm/config/configuration/configuration.component';
import { CreateAccountComponent } from './access/components/create-account/create-account.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './access/components/login/login.component';
import { AccountComponent } from './customer/components/account/account.component';
import { CuponsComponent } from './customer/components/cupons/cupons.component';
import { DetailsComponent } from './customer/components/details/details.component';
import { PurchasesComponent } from './customer/components/purchases/purchases.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'create-account', component:CreateAccountComponent},
  {path:'perfil',component:AccountComponent,children:[
    {path:'', component:DetailsComponent},
    {path:'purchases', component:PurchasesComponent},
    {path:'cupons', component:CuponsComponent},
  ]},
  {path:'configuration', component:ConfigurationComponent,children:[
    {path:'', component:CardFlagComponent},
    {path:'products-categories', component:ProductsCategoriesComponent},
    {path:'cupons-config', component:CuponsConfigComponent},
    {path:'price-categories', component:PriceCategoriesComponent},
    {path:'categories-inativations', component:CategoriesInativationsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
