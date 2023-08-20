import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-tutor',
  templateUrl: './add-tutor.page.html',
  styleUrls: ['./add-tutor.page.scss'],
})
export class AddTutorPage implements OnInit {
  matricula: String;
  nombre: String;
  email: String;
  password: String;
  confirmPassword: String;

  constructor(private router: Router, private http: HttpClient, private alertService: AlertService) {
    // Inicializar las variables aquí si es necesario
    this.matricula = '';
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  ngOnInit() { }

  goToHome() {
    this.router.navigate(['/tabnav-tutor']);
  }


  register() {
    if (!this.matricula || !this.nombre || !this.email || !this.password || !this.confirmPassword) {
      // Validación de campos
      this.alertService.validarCampos();
      return;
    }
    // Verificar si la matrícula ya está registrada
    this.http.get(`https://green-stamp-api.onrender.com/api/tutor/${this.matricula}/existe`).subscribe(
      (response) => {
        this.alertService.matriculaYaRegistrada();
      },
      (error) => {
        if (error.status === 404) {
          // Matrícula no registrada, continuar verificando el correo
          this.http.get(`https://green-stamp-api.onrender.com/api/tutor/email/${this.email}/existe`).subscribe(
            (emailResponse) => {
              this.alertService.correoYaRegistrado();
            },
            (emailError) => {
              if (emailError.status === 404) {
                // Ni la matrícula ni el correo están registrados, realizar el registro
                const tutorData = {
                  matricula: this.matricula,
                  nombre: this.nombre,
                  email: this.email,
                  password: this.password,
                  claseActiva: 'NA',
                };
                this.http.post('https://green-stamp-api.onrender.com/api/register-tutor', tutorData).subscribe(
                  (response) => {
                    this.alertService.tutorRegistrado();
                    this.router.navigate(['/tabnav-admin/buscar']);
                  },
                  (registrationError) => {
                    this.alertService.errorRegistro();
                    console.error('Error:', registrationError);
                  }
                );
              } else {
                // Error desconocido al verificar el correo
                this.alertService.errorVerificarCorreo();
                console.error('Error:', emailError);
              }
            }
          );
        } else {
          // Error desconocido al verificar la matrícula
          this.alertService.errorVerificarMatricula();
          console.error('Error:', error);
        }
      }
    );
  }
  

}
