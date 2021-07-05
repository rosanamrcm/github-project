import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from './../../shared/account.service';
import { LoginService } from './login.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { SnackbarLoginComponent } from './snackbar-login/snackbar-login.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForms: FormGroup;
  hide = true;
  state = false;
  login = {
    username: '',
    password: ''
  };
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 1;

  constructor( 
    private loginService: LoginService, 
    private router: Router, 
    private fb: FormBuilder, 
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForms = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });    
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarLoginComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['mat-toolbar', 'mat-warn'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  async onSubmit(){
    try{
      const result = await this.loginService.login(this.login);
      window.sessionStorage.setItem('name', this.login.username);
      this.router.navigate(['']);
    } catch(error){
      this.openSnackBar();
    }
  }
}
