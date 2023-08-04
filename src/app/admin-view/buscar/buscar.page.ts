import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;

  matricula: String;
  asistencia: String;

  constructor(private router: Router, private http: HttpClient){
    this.matricula = '';
    this.asistencia = 'pendiente';
  }

  ngOnInit() {
  }

  cerrarModal() {
    this.modal.dismiss();
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  addAlumnoAClase() {
    const alumnoData = {
      matricula: this.matricula,
      asistencia: this.asistencia
    };

    const claseId = '64cc3f464204e0e6952450e3'; // Reemplaza esto con el ID

    this.http.post(`http://localhost:3000/api/clase/${claseId}/alumnos`, alumnoData).subscribe(
      (response) => {
        alert('Alumno agregado exitosamente a la clase.');
      },
      (error) => {
        alert('Error al agregar el alumno a la clase.');
        console.error('Error:', error);
      }
    );

    this.cerrarModal();
  }
}
