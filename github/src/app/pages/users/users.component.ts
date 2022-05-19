import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../core/service/users.service';
import { Users } from './../../core/service/users_d';
import { Router } from '@angular/router';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Users;

  username: string;


  
 

  constructor(private _service: UsersService,  private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username")!;
    console.log(this.username)
    this._service.getUsers(this.username).subscribe((data) => {
      if(data){
        this.users = data;
        console.log('Dados retornados: ', this.users);
      }
    }); 
  }

  public redirectRegister() {
     this.router.navigate(['']);
  }






}
