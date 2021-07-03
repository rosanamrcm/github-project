import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
//import { Observable } from 'rxjs';
import { ResponseResult } from './model/response.model';
import { MakeAppointment } from './model/makeAppointment.model';

 

@Injectable({
  providedIn: 'root'
})


export class AccountService {

  constructor( private http: HttpClient ) {}

  async createSchedule(datasSchedule: any){

    let token = window.sessionStorage.getItem('token');
    
    const headers = {"Authorization": `Token ${token}`};
    const body = {agenda_id: datasSchedule.id, horario: datasSchedule.hour};

    console.log("Dados do body: "+ datasSchedule.id);
    console.log("Dados do body: "+ datasSchedule.hour);

    this.http.post<MakeAppointment>(`${environment.api}/consultas/`, body, {headers}).toPromise();
  }

  getSpecialties(){

    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { 
        "Authorization": `Token ${token}`
      }
    }

    return this.http.get<ResponseResult>(`${environment.api}/especialidades/`, options);
  }

  getProfessionals(IdSpecialties:string){

    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { 
        "Authorization": `Token ${token}`
      }
    }
    return this.http.get<ResponseResult>(`${environment.api}/medicos/?especialidade=${IdSpecialties}`, options);
  }

  getScheduleDays(idProfessional: string, idSpecialties:string){

    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { 
        "Authorization": `Token ${token}`
      }
    }
    return this.http.get<ResponseResult>(`${environment.api}/agendas/?medico=${idProfessional}&especialidade=${idSpecialties}`, options);
  }

  getScheduleHour(idMed: string, idSpec: string, day: string){

    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { 
        "Authorization": `Token ${token}`
      }
    }
    return this.http.get<ResponseResult>(`${environment.api}/agendas/?medico=${idMed}&especialidade=${idSpec}&data_inicio=${day}&data_final=${day}`, options);
  } 
}



  
  

