import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardGuard} from './shared/auth-guard.guard';


import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';


const routes: Routes = [

	{	path: '',
		component: HomeComponent,
		 children: [
		 	{ path: 'home',	component: HomeComponent },
		],

  		canActivate: [AuthGuardGuard]
	},
	
	{ path: '',	redirectTo: 'login', pathMatch: 'full' },
	{path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	
	{ path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
