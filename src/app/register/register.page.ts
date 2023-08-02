import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router, private http: HttpClient) {
    // Inicializar las variables aquí si es necesario
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  ngOnInit() {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const userData = { email: this.email, password: this.password };

    this.http.post('http://localhost:3000/api/register', userData).subscribe(
      (response) => {
        alert('Usuario registrado exitosamente.');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Error al registrar el usuario.');
        console.error('Error:', error);
      }
    );
  }
}
