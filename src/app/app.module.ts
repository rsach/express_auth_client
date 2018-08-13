import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import {AppRoutingModule} from './app.routing/app.routing.module';
import {AuthService} from './auth/auth.service';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsersService} from './users/users.service';
import {AuthGuard} from './auth-guard.service';
import {NgxJsonViewerModule} from 'ngx-json-viewer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    NgxJsonViewerModule

  ],
  providers: [
    AuthService,
    UsersService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
