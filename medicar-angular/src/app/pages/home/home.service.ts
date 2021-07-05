import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

	getSchedule(){
	    return this.http.get<any>(`${environment.api}/consultas/`);
	}

	deleteAppointments(idAppointments: number){
	    return this.http.delete<any>(`${environment.api}/consultas/${idAppointments}/`);
	}
}
