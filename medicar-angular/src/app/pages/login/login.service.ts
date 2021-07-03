import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


	async login(user: any){
	  	const result = await this.http.post<any>(`${environment.api}/users/login`, user).toPromise();
	    
	    if(result && result.token){
	    window.sessionStorage.setItem('token', result.token);

	      return true;
	    }

	    return false;
	}
}
