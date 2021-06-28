import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

 
@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor( private http: HttpClient, ) {
 }

  async login(user: any){
  	const result = await this.http.post<any>(`${environment.api}/users/login`, user).toPromise();
    
    if(result && result.token){
    window.sessionStorage.setItem('token', result.token);

      return true;
    }

    return false;
  }

  async createAccount(account: any){
    const result = await this.http.post<any>(`${environment.api}/users/`, account).toPromise();
    console.log(result);
    return result;
  }

  async createSchedule(datasSchedule: any){

    let token = window.sessionStorage.getItem('token');
    
    const headers = {"Authorization": `Token ${token}`};
    const body = {agenda_id: datasSchedule.id, horario: datasSchedule.hour};

    console.log("Dados do body: "+ datasSchedule.id);
    console.log("Dados do body: "+ datasSchedule.hour);

    this.http.post<any>(`${environment.api}/consultas/`, body, {headers}).toPromise();
  }

  getSpecialties(){

    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { 
        "Authorization": `Token ${token}`
      }
    }

    return this.http.get<any>(`${environment.api}/especialidades/`, options);
  }

  getProfessionals(IdSpecialties:string){

    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { 
        "Authorization": `Token ${token}`
      }
    }
    return this.http.get<any>(`${environment.api}/medicos/?especialidade=${IdSpecialties}`, options);
  }

  getScheduleDays(idProfessional: string, idSpecialties:string){

    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { 
        "Authorization": `Token ${token}`
      }
    }
    return this.http.get<any>(`${environment.api}/agendas/?medico=${idProfessional}&especialidade=${idSpecialties}`, options);
  }

  getScheduleHour(idMed: string, idSpec: string, day: string){

    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { 
        "Authorization": `Token ${token}`
      }
    }
    return this.http.get<any>(`${environment.api}/agendas/?medico=${idMed}&especialidade=${idSpec}&data_inicio=${day}&data_final=${day}`, options);
  }

  getSchedule(){

    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { 
        "Authorization": `Token ${token}`
      }
    }
    return this.http.get<any>(`${environment.api}/consultas/`, options);
  }

  deleteAppointments(idAppointments: number){
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { 
        "Authorization": `Token ${token}`
      }
    }
    return this.http.delete<any>(`${environment.api}/consultas/${idAppointments}/`, options);
  }  
}



  
  

