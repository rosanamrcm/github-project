import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AccountService } from './../../shared/account.service';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  newForm: FormGroup;

  /*
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  
  */
  hidePassword = true;	
  hideConfirmPasword = true;
  account = {
    username: '',
    email: '',
    password: '',
  };


  constructor( private registerService: RegisterService, private router: Router, private fb: FormBuilder) {}

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
