import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { Router } from '@angular/router';
import { AccountService } from './../../shared/account.service';
import { ReturnAppointments } from './../../shared/model/returnAppointments.model';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  returnAppointments: ReturnAppointments[];

  nameUser: any;

  constructor(
    public dialog: MatDialog, 
    private router: Router, 
    private accountService: AccountService) {
  }


  ngOnInit(): void {
    this.listAppointments();
    this.nameUser = window.sessionStorage.getItem('name');
  }


  logout(){ 
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('name');
    this.router.navigate(['/login']);
  }

 openDialog() {
    const dialogRef = this.dialog.open(DialogFormComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  

  listAppointments(){
    this.accountService.getSchedule().subscribe(data => {
      this.returnAppointments = data;
    });
  }

  DeleteAppointments(idAppointments: number){
    this.accountService.deleteAppointments(idAppointments).subscribe(data => {
    this.listAppointments();
    this.returnAppointments = data;
    });
  }  
}





