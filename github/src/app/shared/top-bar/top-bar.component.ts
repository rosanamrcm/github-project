import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from './../../pages/profile/profile.component';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {}

  public redirectRegister() {
    this.router.navigate(['']);
  }

  public verifyRouter(): boolean {
    const currentRouter = this.router.url;
    if(currentRouter === '/profile'){
      return false;
    }
    else{
      return true;
    }  
  }
}
