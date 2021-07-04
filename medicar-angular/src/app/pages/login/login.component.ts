import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from './../../shared/account.service';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

/*
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  */

  loginForms: FormGroup;

  hide = true;
  state = false;
  login = {
    username: '',
    password: ''
  };

  constructor( private loginService: LoginService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForms = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });    
  }

  async onSubmit(){
    try{
      const result = await this.loginService.login(this.login);
      console.log('Login Efetuado: ${result}');
      window.sessionStorage.setItem('name', this.login.username);  
      this.router.navigate(['']);
    } catch(error){
        console.error(error);
    }
  }
}
