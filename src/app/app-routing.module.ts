import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './access/components/login/login.component';
import { AccountComponent } from './customer/components/account/account.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'perfil',component:AccountComponent,children:[]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
