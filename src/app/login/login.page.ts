import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../services/alert.service';
import { MatriculaService } from '../services/matricula.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = "";
  password: string = "";
  errorMessage: string = "";
  matricula: string = "";

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    private matriculaService: MatriculaService
  ) { }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    this.http
      .post<any>('https://green-stamp-api.onrender.com/api/login', { email: this.email, password: this.password })
      .subscribe(
        (response) => {
          const userType = response.userType;
          this.matricula = response.matricula; // Asignar el ID del alumno a la variable userId
          // Actualiza la matrícula en el servicio
          this.matriculaService.actualizarMatricula(this.matricula);

          if (userType === 'admin') {
            this.router.navigate(['/tabnav-admin/buscar']);
          } else if (userType === 'tutor') {
            this.router.navigate(['/tabnav-tutor/listas'], { queryParams: { matricula: this.matricula } });
          } else if (userType === 'alumno') {
            this.router.navigate(['/tabnav-alumno/clases'], { queryParams: { matricula: this.matricula } });
          } else {
            this.alertService.errorUsuarioNotFound();
          }
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          this.alertService.errorUsuarioNotFound();
        }
      );
  }
}
