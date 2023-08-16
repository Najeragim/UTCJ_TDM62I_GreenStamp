import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
})
export class ListasPage implements OnInit {

  tutorMatr: string;
  materias: string[] = [];
  selectedMateria: string;
  fechas: { formatted: string; raw: string; }[] = [];
  selectedFechaRaw: string;
  clase: any; // Variable para almacenar la clase seleccionada

  constructor(private router: Router, private http: HttpClient, private matriculaService: MatriculaService) {
    this.selectedMateria = '';
    this.selectedFechaRaw = '';
    this.tutorMatr = ''; // El valor del tutorId se asignará al iniciar sesión
  }

  ngOnInit() {
    this.matriculaService.actualMatricula.subscribe(matricula => {
      this.tutorMatr = matricula;
    });
    //this.tutorMatr = '123456';

    // Carga las materias correspondientes al tutor al iniciar la página
    this.fetchMaterias();
  }

  formatDateTime(dateTime: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const date = new Date(dateTime);
    return date.toLocaleDateString(undefined, options);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  fetchMaterias() {
    // Realiza una solicitud para obtener las materias según el tutor
    this.http.get<string[]>(`http://localhost:3000/api/tutor/${this.tutorMatr}/materias`).subscribe(
      (data) => {
        this.materias = data;
      },
      (error) => {
        console.error('Error fetching materias:', error);
      }
    );
  }

  fetchFechas() {
    // Realiza una solicitud para obtener las fechas según la materia y el tutor
    if (this.selectedMateria) {
      this.http.get<any[]>(`http://localhost:3000/api/tutor/${this.tutorMatr}/materia/${this.selectedMateria}/fechas`).subscribe(
        (data) => {
          this.fechas = data.map((item) => {
            const formattedDate = this.formatDateTime(item.fecha_hora);
            return { formatted: formattedDate, raw: item.fecha_hora };
          });
        },
        (error) => {
          console.error('Error fetching fechas:', error);
        }
      );
    }
  }

  fetchClase() {
    // Realiza una solicitud para obtener la clase según la fecha, materia y tutor
    if (this.selectedFechaRaw) {
      this.http.get<any[]>(`http://localhost:3000/api/tutor/${this.tutorMatr}/materia/${this.selectedMateria}/fecha/${this.selectedFechaRaw}`).subscribe(
        (data) => {
          this.clase = data;
        },
        (error) => {
          console.error('Error fetching clase:', error);
        }
      );
    }
  }
}
