import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = "";
  password: string = "";
  errorMessage: string = "";
  userId: string = ""; 

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      subHeader: 'Usuario no encontrado :(',
      message: 'Verifica tus credenciales e intenta nuevamente.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  login() {
    this.http
      .post<any>('http://localhost:3000/api/login', { email: this.email, password: this.password })
      .subscribe(
        (response) => {
          const userType = response.userType;
          this.userId = response.userId; // Asignar el ID del alumno a la variable userId

          if (userType === 'admin') {
            this.router.navigate(['/tabnav-admin']);
          } else if (userType === 'alumno') {
            // Redirigir a la página 'tabnav-alumno' y pasar el ID del alumno en los parámetros de la URL
            this.router.navigate(['/tabnav-alumno'], { queryParams: { userId: this.userId } });
          } else if (userType === 'tutor') {
            this.router.navigate(['/tabnav-tutor']);
          } else {
            this.presentAlert();
          }
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          this.presentAlert();
        }
      );
  }
}
