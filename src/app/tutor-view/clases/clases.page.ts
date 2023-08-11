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
  clases: { formatted: string; fecha_hora: string; materia: string; salon: string; estado: string; }[] = [];

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

 // Reemplaza la función fetchClases() actual en clases.page.ts
fetchClases() {
  if (this.tutorMatr) {
      this.http.get<any[]>(`http://localhost:3000/api/tutor/${this.tutorMatr}/clases`).subscribe(
          (data) => {
              this.clases = data.map((item) => {
                  const formattedDate = this.formatDateTime(item.fecha_hora);
                  return { formatted: formattedDate, fecha_hora: item.fecha_hora, materia: item.materia, salon: item.salon, estado: item.estado };
              });
          },
          (error) => {
              console.error('Error al obtener las clases:', error);
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
  

  iniciarClase() {
    if (!this.selectedClase) {
      console.error('Selecciona una clase antes de iniciar.');
      return;
    }
  
    const selectedClass = this.clases.find(c => c.fecha_hora === this.selectedClase);
  
    if (!selectedClass) {
      console.error('No se encontró la clase seleccionada en la lista.');
      return;
    }
  
    // Cambia el estado de la clase actual a "activa"
    this.http.put(`http://localhost:3000/api/clase/${selectedClass.materia}/fecha/${selectedClass.fecha_hora}/estado`, { estado: 'activa' })
    
      .subscribe(
        () => {
          console.log('Clase activada exitosamente.');
          this.fetchClases();
        },
        (error) => {
          console.error('Error al activar la clase:', error);
        }
      );
     
      
  }
  
  
  finalizarClase() {
    if (!this.selectedClase) {
        console.error('Selecciona una clase antes de finalizar.');
        return;
    }

    const selectedClass = this.clases.find(c => c.fecha_hora === this.selectedClase);

    if (!selectedClass) {
        console.error('No se encontró la clase seleccionada en la lista.');
        return;
    }

    // Cambia el estado de la clase actual a "finalizado"
    this.http.put(`http://localhost:3000/api/clase/${selectedClass.materia}/fecha/${selectedClass.fecha_hora}/finalizar`, {})
        .subscribe(
            () => {
                console.log('Clase finalizada exitosamente. Alumnos marcados como "falta".');
                this.fetchClases();
            },
            (error) => {
                console.error('Error al finalizar la clase:', error);
            }
        );
}

  
}  