import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
//import { ResponseResult } from './../../shared/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

	getSchedule(){
		/*
	    const token = window.sessionStorage.getItem('token');
	    const options = {
	      headers: { 
	        "Authorization": `Token ${token}`
	      }
	    }
	    */
	    return this.http.get<any>(`${environment.api}/consultas/`);
	}

	deleteAppointments(idAppointments: number){
		/*
	    let token = window.sessionStorage.getItem('token');
	    const options = {
	      headers: { 
	        "Authorization": `Token ${token}`
	      }
	    }
	    */
	    return this.http.delete<any>(`${environment.api}/consultas/${idAppointments}/`);
	}
}
