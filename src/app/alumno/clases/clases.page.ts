import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  
  alumnoMatr: string;
  clases: { fecha_hora: string; materia: string; profesor: string; salon: string }[] = [];

  constructor(private router: Router, private http: HttpClient, private matriculaService: MatriculaService) {
    this.alumnoMatr = '';
  }

  ngOnInit() {
    this.matriculaService.actualMatricula.subscribe(matricula => {
      this.alumnoMatr = matricula;
    });
    // Ejemplo: Asigna la matrícula del alumno al iniciar sesión
    //this.alumnoMatr = '21311212';
    this.fetchClasesPendientes();
  }

  goToLogin() {
    this.alumnoMatr = '';
    this.router.navigate(['/login']);
  }

  fetchClasesPendientes() {
    if (this.alumnoMatr) {
      this.http.get<any[]>(`http://localhost:3000/api/alumno/${this.alumnoMatr}/clases/pendientes`).subscribe(
        (data) => {
          this.clases = data.map((item) => {
            const formattedDate = this.formatDateTime(item.fecha_hora);
            return { fecha_hora: formattedDate, materia: item.materia, profesor: item.tutor, salon: item.salon };
          });
        },
        (error) => {
          console.error('Error fetching pendiente clases:', error);
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
