import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';        
import { MatListModule } from '@angular/material/list';
import { DialogFormComponent } from './pages/home/dialog-form/dialog-form.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MatSelectModule } from '@angular/material/select';
import { AccountService } from './shared/account.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { httpInterceptorProviders } from './http-interceptors';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarLoginComponent } from './pages/login/snackbar-login/snackbar-login.component';
import { SnackbarRegisterComponent } from './pages/register/snackbar-register/snackbar-register.component';
import { SnackbarRegisterErrorComponent } from './pages/register/snackbar-register-error/snackbar-register-error.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DialogFormComponent,
    PageNotFoundComponent,
    SnackbarLoginComponent,
    SnackbarRegisterComponent,
    SnackbarRegisterErrorComponent,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    FormsModule, 
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule  
  ],
  providers: [
    AccountService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
