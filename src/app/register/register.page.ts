import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  matricula: String;
  rfid: String;
  nombre: String;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router, private http: HttpClient, private alertService: AlertService) {
    // Inicializar las variables aquí si es necesario
    this.matricula = '';
    this.rfid = '';
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  ngOnInit() { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {

    if (!this.matricula || !this.rfid || !this.nombre || !this.email || !this.password || !this.confirmPassword) {
      // Validación de campos
      this.alertService.validarCampos();
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.alertService.passMissmatch();
      return;
    }

    const alumnoData = {
      matricula: this.matricula,
      rfid: this.rfid,
      nombre: this.nombre,
      email: this.email,
      password: this.password
    };

    this.http.get(`https://green-stamp-api.onrender.com/api/alumno/${alumnoData.matricula}/existe`).subscribe(
      (response) => {
        this.alertService.alumnoYaRegistrado();
      },
      (error) => {
        this.http.get(`https://green-stamp-api.onrender.com/api/alumno/${alumnoData.rfid}/existe`).subscribe(
          (response) => {
            this.alertService.rfidYaRegistrado();
          },
          (error) => {
            this.http.get(`https://green-stamp-api.onrender.com/api/alumno/email/${alumnoData.email}/existe`).subscribe(
              (response) => {
                this.alertService.correoYaRegistrado();
              },
              (error) => {
                this.http.post('https://green-stamp-api.onrender.com/api/register-alumno', alumnoData).subscribe(
                  (response) => {
                    this.alertService.alumnoRegistrado();
                    this.router.navigate(['/login']);
                  },
                  (error) => {
                    this.alertService.errorRegistro();
                    console.error('Error:', error);
                  }
                );
              }
            )
          }
        )
      }
    )

  }
}
