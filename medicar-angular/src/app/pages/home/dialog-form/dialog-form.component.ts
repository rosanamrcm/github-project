import { Component, OnInit ,Inject } from '@angular/core';
import { Router } from '@angular/router';
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
  identificate: Identificate;
  dataSchedule:Schedule;
  selectedDay: string;
  selectedHour: string;    

/*
 identificate = {
    idSpecialties:'',
    idProfessional: '',
    idSchedule: 0,
  };

  dataSchedule = {
    hour: '',
    id: 0,
  };
  */

  constructor(private accountService: AccountService, private router: Router) {
    //this.identificate.idSpecialties = "0"; 
    //this.identificate.idProfessional = "0";
  }

  ngOnInit(): void {
    

    
    this.listSpecialties();

    /*
    this.accountService.getSpecialties().subscribe(
      (data) => {
        console.log(data.results);
      },
      (error) => {
        console.log(error);
      }
    )
    */
  }

   getidSpecialties(Id:number){
    console.log(Id);
    this.identificate.idSpecialties = `${Id}`;
    console.log(this.identificate.idSpecialties);
    this.listProfessionals(this.identificate.idSpecialties);
  }
  getIdProfessional(valueId:number){
    console.log(valueId);
    this.identificate.idProfessional = `${valueId}`;
    console.log(this.identificate.idProfessional);
    this.listScheduleDays(this.identificate.idProfessional,this.identificate.idSpecialties);
  }

  getIdSchedule(idSchedule: number){
    console.log(idSchedule);
    this.identificate.idSchedule = idSchedule;
    console.log( "Id da agenda: " + this.identificate.idSchedule);
  }
  
  listSpecialties(){
    this.accountService.getSpecialties().subscribe(
      data => {
        this.responseSpecialist = data.results;
        console.log(this.responseSpecialist);
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
    console.log('Dia selecionado:' + this.selectedDay);
    this.listScheduleHours(this.identificate.idProfessional,this.identificate.idSpecialties, this.selectedDay);
    this.getIdSchedule(id);
  }

  async onSubmit(){

    this.dataSchedule.hour = this.selectedHour;
    this.dataSchedule.id = this.identificate.idSchedule;
    try {
      const result = await this.accountService.createSchedule(this.dataSchedule);
      //window.location.reload();
      //this.load();
      //this.listSpecialties();

      
    }  catch(error){
      console.error(error);
    }  
  } 
}
