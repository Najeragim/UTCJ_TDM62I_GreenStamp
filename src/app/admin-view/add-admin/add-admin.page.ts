import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.page.html',
  styleUrls: ['./add-admin.page.scss'],
})

export class AddAdminPage implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService
  ) {
    // Inicializar las variables aquí si es necesario
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/tabnav-tutor']);
  }

  


  register() {
    if (!this.email || !this.password || !this.confirmPassword) {
      // Validación de campos
      this.alertService.validarCampos();
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.alertService.passMissmatch();
      return;
    }

    this.http.get(`https://green-stamp-api.onrender.com/api/tutor/email/${this.email}/existe`).subscribe(
      async (response) => {
        await this.alertService.correoYaRegistrado();
      },
      async (error) => {
        if (error.status === 404) {
          // El correo no está registrado, realizar el registro
          const adminData = {
            email: this.email,
            password: this.password,
          };
          this.http.post('https://green-stamp-api.onrender.com/api/register-admin', adminData).subscribe(
            (response) => {
              this.alertService.adminRegistrado();
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
          console.error('Error:', error);
        }
      }
    );
  }
}
