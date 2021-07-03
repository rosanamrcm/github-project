import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import { AccountService } from './../../shared/account.service';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  hidePassword = true;	

  hideConfirmPasword = true;

  account = {
    username: '',
    email: '',
    password: '',
  };


  constructor( private registerService: RegisterService, private router: Router,) {}

  ngOnInit(): void {
  }

  async onSubmit(){

    try {
      const result = await this.registerService.createAccount(this.account);

      console.log(result);

    }  catch(error){
      console.error(error);
    }
        this.router.navigate(['/login']);

  }

}
