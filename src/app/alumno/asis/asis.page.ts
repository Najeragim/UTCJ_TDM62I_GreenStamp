import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-asis',
  templateUrl: './asis.page.html',
  styleUrls: ['./asis.page.scss'],
})
export class AsisPage implements OnInit {

  alumnoMatr: string;
  clases: { 
    fecha_hora: string; 
    materia: string; 
    profesor: string; 
    alumnos: { 
      matricula: string; 
      asistencia: string 
    }[] 
  }[] = [];

  constructor(
    private router: Router, 
    private http: HttpClient, 
    private matriculaService: MatriculaService
  ) {
    this.alumnoMatr = '';
  }

  ngOnInit() {
    this.matriculaService.actualMatricula.subscribe(matricula => {
      this.alumnoMatr = matricula;
    });
    //this.alumnoMatr = '21311212';
    this.fetchAsistencias();
  }

  goToLogin() {
    this.alumnoMatr = '';
    this.router.navigate(['/login']);
  }

  fetchAsistencias() {
    if (this.alumnoMatr) {
      this.http.get<any[]>(`http://localhost:3000/api/alumno/${this.alumnoMatr}/clases/asistencias`).subscribe(
        (data) => {
          this.clases = data.map((item) => {
            const formattedDate = this.formatDateTime(item.fecha_hora);
            return {
              fecha_hora: formattedDate,
              materia: item.materia,
              profesor: item.tutor,
              alumnos: item.alumnos.map((alumno: { matricula: any; asistencia: any; }) => {
                return { matricula: alumno.matricula, asistencia: alumno.asistencia };
              }),
            };
          });
        },
        (error) => {
          console.error('Error fetching asistencias:', error);
        }
      );
    }
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
}
