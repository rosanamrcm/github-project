import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { ResponseResult } from './model/response.model';
import { MakeAppointment } from './model/makeAppointment.model';

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  constructor( private http: HttpClient ) {}

  async createSchedule(datasSchedule: any){
    const body = {agenda_id: datasSchedule.id, horario: datasSchedule.hour};
    this.http.post<MakeAppointment>(`${environment.api}/consultas/`, body).toPromise();
  }

  getSpecialties(){
    return this.http.get<ResponseResult>(`${environment.api}/especialidades/`);
  }

  getProfessionals(IdSpecialties:string){
    return this.http.get<ResponseResult>(`${environment.api}/medicos/?especialidade=${IdSpecialties}`);
  }

  getScheduleDays(idProfessional: string, idSpecialties:string){
    return this.http.get<ResponseResult>(`${environment.api}/agendas/?medico=${idProfessional}&especialidade=${idSpecialties}`);
  }

  getScheduleHour(idMed: string, idSpec: string, day: string){
    return this.http.get<ResponseResult>(`${environment.api}/agendas/?medico=${idMed}&especialidade=${idSpec}&data_inicio=${day}&data_final=${day}`);
  }

  getAuthorizationToken(){
    const token = window.sessionStorage.getItem('token');
    return token;
  } 
}



  
  

