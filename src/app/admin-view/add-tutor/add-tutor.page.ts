import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-tutor',
  templateUrl: './add-tutor.page.html',
  styleUrls: ['./add-tutor.page.scss'],
})
export class AddTutorPage implements OnInit {
  matricula: String;
  nombre: String;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router, private http: HttpClient) {
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
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const tutorData = {
      matricula: this.matricula,
      nombre: this.nombre,
      email: this.email,
      password: this.password 
    };

    this.http.post('http://localhost:3000/api/register-tutor', tutorData).subscribe(
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
