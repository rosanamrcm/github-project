import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from './../shared/account.service'

/** Pass untouched request through to the next request handler. */
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
    return next.handle(request).pipe(
      catchError(this.handleError)
    );
  }
  handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log("Ocorreu um erro: ", error.error.message);
    }
    else{
      console.log("Código do erro: ", error.status); 
    }
    return throwError("Ocorreu um erro, tente novamente");
  }
}