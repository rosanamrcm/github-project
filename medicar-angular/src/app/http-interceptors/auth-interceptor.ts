import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AccountService } from './../shared/account.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor( private accountService: AccountService){}

  intercept(req: HttpRequest<any>, next: HttpHandler){
  	const token = this.accountService.getAuthorizationToken();
  	let request: HttpRequest<any> = req;
  	if(token){
  		request = req.clone({
  			headers: req.headers.set('Authorization', `Token ${token}`)
  		});
  	}
    return next.handle(request);
  }  
}