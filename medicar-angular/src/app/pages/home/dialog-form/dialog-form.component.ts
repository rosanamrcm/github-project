import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from './../../../shared/account.service';
import { ResponseSpecialist } from './../../../shared/model/responseSpecialist.model'
import { ResponseProfessionals } from './../../../shared/model/responseProfessionals.model'
import { ResponseSchedule } from './../../../shared/model/responseSchedule.model';
import { ResponseHour } from './../../../shared/model/responseHour.model';
import { Schedule } from './types_d';
import { Identificate } from './types_d';


@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {

  responseSpecialist: ResponseSpecialist[];
  responseProfessionals: ResponseProfessionals[];
  responseSchedule: ResponseSchedule[];
  responseHour: ResponseHour[];
  identificate: Identificate = {
    idSpecialties:'',
    idProfessional: '',
    idSchedule: 0,
  };
  dataSchedule:Schedule = {
    hour: '',
    id: 0,
  };
  selectedDay: string;
  selectedHour: string;
  
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.listSpecialties();
  }

  getidSpecialties(Id:number){
    this.identificate.idSpecialties = `${Id}`;
    this.listProfessionals(this.identificate.idSpecialties);
  }
  getIdProfessional(valueId:number){
    this.identificate.idProfessional = `${valueId}`;
    this.listScheduleDays(this.identificate.idProfessional,this.identificate.idSpecialties);
  }

  getIdSchedule(idSchedule: number){
    this.identificate.idSchedule = idSchedule
  }
  
  listSpecialties(){
    this.accountService.getSpecialties().subscribe(
      data => {
        this.responseSpecialist = data.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listProfessionals(idSpecialties:string){
    this.accountService.getProfessionals(idSpecialties).subscribe(data => {
      this.responseProfessionals = data.results;
    });
  }
  
  listScheduleDays(idProfessional: string, idSpecialties:string){
    this.accountService.getScheduleDays(idProfessional, idSpecialties).subscribe(data => {
      this.responseSchedule = data.results;
    });
  }

  listScheduleHours(idMed:string, idSpec:string, daySelected: string){
    this.accountService.getScheduleHour(idMed,idSpec, daySelected).subscribe(data => {
      this.responseHour = data.results[0].horarios;
    });
  }

  callHour(id: number){
    this.listScheduleHours(this.identificate.idProfessional,this.identificate.idSpecialties, this.selectedDay);
    this.getIdSchedule(id);
  }

  async onSubmit(){
    this.dataSchedule.hour = this.selectedHour;
    this.dataSchedule.id = this.identificate.idSchedule;
    try {
      const result = await this.accountService.createSchedule(this.dataSchedule);      
    }  catch(error){
      console.error(error);
    }  
  } 
}
