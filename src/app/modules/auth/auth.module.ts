import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from '@workspace/user/services/user.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AuthRoutingModule} from './auth-routing.module';
import {UserLoginComponent} from './user-login/user-login.component';
import {CommonModule} from '@angular/common';
import {UserSignUpComponent} from './user-sign-up/user-sign-up.component';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserSignUpComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  providers: [
    UserService
  ],
})
export class AuthModule { }
