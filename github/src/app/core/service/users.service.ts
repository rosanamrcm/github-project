import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './users_d';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient: HttpClient) { }


   public getUsers(username:  string){
    const urlApi = `https://api.github.com/users/${username}`;
    return this._httpClient.get<Users>(urlApi);
  }
}
