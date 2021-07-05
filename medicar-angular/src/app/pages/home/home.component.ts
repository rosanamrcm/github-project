import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { Router } from '@angular/router';
import { ReturnAppointments } from './../../shared/model/returnAppointments.model';
import { HomeService } from './home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  
  returnAppointments: ReturnAppointments[];  
  nameUser: string;
  stateReload:boolean = false;

  constructor( public dialog: MatDialog, private router: Router, private homeService: HomeService) {}

  ngOnInit(): void {
    this.listAppointments();
    this.getNameUser();
  }

  logout(){ 
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('name');
    this.router.navigate(['/login']);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.listAppointments();
    });
  }
  
  listAppointments(){
    this.homeService.getSchedule().subscribe(data => {
      this.returnAppointments = data;
      this.stateReload = true;
    });
  }

  deleteAppointments(idAppointments: number){
    this.homeService.deleteAppointments(idAppointments).subscribe(data => {
    this.listAppointments();
    this.returnAppointments = data;
    });
  } 

  getNameUser(){
    const returnName = window.sessionStorage.getItem('name');

    if(returnName !== null){
      this.nameUser = returnName;
    }
     else{
      this.nameUser = "Noname";
     }
  }
}





