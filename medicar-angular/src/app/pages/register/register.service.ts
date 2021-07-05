import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

   async createAccount(account: any){
    const result = await this.http.post<any>(`${environment.api}/users/`, account).toPromise();
    console.log(result);
    return result;
  }
}
