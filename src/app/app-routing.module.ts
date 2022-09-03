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
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
