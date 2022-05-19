import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = {
    name: ""
  }  

  constructor(private _router: Router) { }

  ngOnInit(): void {
    
  }

  public submit() {
   localStorage.setItem("username", this.user.name.replace("@",""));
   console.log(this.user)
   this._router.navigate(['/users'])
  }
}
