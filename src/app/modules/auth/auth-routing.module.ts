import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserLoginComponent} from './user-login/user-login.component';
import {UserSignUpComponent} from './user-sign-up/user-sign-up.component';

const routes: Routes = [
  {path: 'login', component: UserLoginComponent},
  {path: 'sign-up', component: UserSignUpComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
