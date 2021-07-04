import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

	constructor(private router: Router){

	}

  canActivate( route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): boolean {
   	const token = window.sessionStorage.getItem('token');
   	if(token){
   		return true;
   	}
   	else{
   		this.router.navigate(['login']);
   		return false;
   	}
  }
  
}
