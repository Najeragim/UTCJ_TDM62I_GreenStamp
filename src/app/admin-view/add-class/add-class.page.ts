import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';

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
  salon: String;

  constructor(private router: Router, private http: HttpClient, private alertService: AlertService) {
    this.fecha_hora = '';
    this.tutor = '';
    this.materia = '';
    this.alumnos = [];
    this.estado = 'pendiente';
    this.salon = '';
  }

  ngOnInit() { }

  register() {
    if (!this.fecha_hora || !this.tutor || !this.materia || !this.salon) {
      // Validación de campos
      this.alertService.validarCampos();
      return;
    }
    // Verificar si el tutor con la matrícula existe en la base de datos
    this.http.get(`http://localhost:3000/api/tutor/${this.tutor}/existe`).subscribe(
      (response) => {
        // Si el tutor existe, procede con el registro de la clase
        const claseData = {
          fecha_hora: this.fecha_hora,
          tutor: this.tutor,
          materia: this.materia,
          alumnos: this.alumnos,
          estado: this.estado,
          salon: this.salon
        };

        this.http.post('http://localhost:3000/api/register-clase', claseData).subscribe(
          (response) => {
            this.alertService.claseRegistrada();
            this.router.navigate(['/tabnav-admin/buscar']);
          },
          (error) => {
            this.alertService.errorRegistro();
            console.error('Error:', error);
          }
        );
      },
      (error) => {
        this.alertService.errorTutorNotFound();
        console.error('Error:', error);
      }
    );
  }


}
