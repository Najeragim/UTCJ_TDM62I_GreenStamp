import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  tutorMatr: string;
  selectedClase: string;
  clases: { formatted: string; fecha_hora: string; materia: string; salon: string; }[] = [];

  constructor(private router: Router, private http: HttpClient) {
    this.tutorMatr = ''; // El valor del tutorId se asignará al iniciar sesión
    this.selectedClase = '';
  }

  ngOnInit() {
    // Ejemplo: Asigna el tutorId al iniciar sesión
    this.tutorMatr = '123456';
    this.fetchClases();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  fetchClases() {
    if (this.tutorMatr) {
      this.http.get<any[]>(`http://localhost:3000/api/tutor/${this.tutorMatr}/clases/pendientes`).subscribe(
        (data) => {
          this.clases = data.map((item) => {
            const formattedDate = this.formatDateTime(item.fecha_hora);
            return { formatted: formattedDate, fecha_hora: item.fecha_hora, materia: item.materia, salon: item.salon };
          });
        },
        (error) => {
          console.error('Error fetching clases:', error);
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
