import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.page.html',
  styleUrls: ['./add-class.page.scss'],
})
export class AddClassPage implements OnInit {
  fecha_hora: String;
  tutor: String;
  materia: String;
  alumnos: Array<Object>;
  estado: String;

  constructor(private router: Router, private http: HttpClient) {
    this.fecha_hora = '';
    this.tutor = '';
    this.materia = '';
    this.alumnos = [];
    this.estado = 'pendiente';
  }

  ngOnInit() { }

  register() {
    const claseData = {
      fecha_hora: this.fecha_hora,
      tutor: this.tutor,
      materia: this.materia,
      alumnos: this.alumnos,
      estado: this.estado
    };

    this.http.post('http://localhost:3000/api/register-clase', claseData).subscribe(
      (response) => {
        alert('Usuario registrado exitosamente.');
        this.router.navigate(['/tabnav-admin']);
      },
      (error) => {
        alert('Error al registrar el usuario.');
        console.error('Error:', error);
      }
    );
  }

}
