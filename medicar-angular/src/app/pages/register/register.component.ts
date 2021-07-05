import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AccountService } from './../../shared/account.service';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { SnackbarRegisterComponent } from './snackbar-register/snackbar-register.component';
import { SnackbarRegisterErrorComponent } from './snackbar-register-error/snackbar-register-error.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newForm: FormGroup;
  hidePassword = true;	
  hideConfirmPasword = true;
  account = {
    username: '',
    email: '',
    password: '',
  };
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 0.5;

  constructor( 
    private registerService: RegisterService, 
    private router: Router, 
    private fb: FormBuilder, 
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.newForm = this.fb.group({
      nameUser: ['', [Validators.required]],
      emailFormControl: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPassword = group.get('passwordConfirm')?.value;
    return pass === confirmPassword ? null : { notSame: true };
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarRegisterComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['mat-toolbar', 'mat-accent'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openSnackBarError() {
    this._snackBar.openFromComponent(SnackbarRegisterErrorComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['mat-toolbar', 'mat-warn'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  async onSubmit(){
    try {
      const result = await this.registerService.createAccount(this.account);
      this.openSnackBar();
      this.router.navigate(['/login']);
    } 
    catch(error){
      this.openSnackBarError();
    }  
  }
}
