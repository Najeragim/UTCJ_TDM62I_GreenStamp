import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router){}

  ngOnInit() {
  }

  goToForgotPassword(){
    this.router.navigate(['/forgot-password'])
  }

  goToRegister(){
    this.router.navigate(['/register'])
  }

  goToTabnavAdmin(){
    this.router.navigate(['/tabnav-admin'])
  }

  goToTabnavTutor(){
    this.router.navigate(['/tutor/prof'])
  }

  goToTabnavAlumno(){
    this.router.navigate(['/tabnav-alumno'])
  }
}
