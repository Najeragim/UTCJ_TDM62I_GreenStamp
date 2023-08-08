import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonModal } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

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
  materias: string[] = [];
  selectedMateria: string;
  fechas: { formatted: string; raw: string; }[] = [];
  selectedFechaFormatted: string;
  selectedFechaRaw: string;
  listaAlumnos: any[] = [];

  constructor(
    private router: Router, 
    private http: HttpClient,
    private loadingController: LoadingController
  ){
    this.matricula = '';
    this.asistencia = 'pendiente';
    this.selectedMateria = '';
    this.selectedFechaFormatted = '';
    this.selectedFechaRaw = '';
  }

  ngOnInit() {
    this.fetchMaterias();
  }


  //Funciones para el filtrado de materia y fechas

  // Convertir a formato agradable a la vista
  formatDateTime(dateTime: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    
    // Convierte la cadena de fecha en un objeto Date
    const date = new Date(dateTime);
    
    // Formatea el objeto Date utilizando las opciones especificadas
    return date.toLocaleDateString(undefined, options);
  }

  fetchMaterias() {
    this.http.get<string[]>('http://localhost:3000/api/materias').subscribe(
      (data) => {
        this.materias = data;
      },
      (error) => {
        console.error('Error fetching materias:', error);
      }
    );
  }

  async fetchFechas() {
    if (this.selectedMateria) {
      this.http.get<any[]>(`http://localhost:3000/api/materia/${this.selectedMateria}/fechas`).subscribe(
        (data) => {
          // Guarda ambos valores de fecha correctamente en la propiedad fechas
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

  async fetchAlumnos() {
    if (this.selectedMateria && this.selectedFechaRaw) {
      const loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await loading.present();
  
      this.http
        .get<any[]>(`http://localhost:3000/api/materia/${this.selectedMateria}/fecha/${this.selectedFechaRaw}/alumnos`)
        .subscribe(
          (data) => {
            this.listaAlumnos = data;
            loading.dismiss();
          },
          (error) => {
            console.error('Error fetching alumnos:', error);
            loading.dismiss();
          }
        );
    }
  }
  


  //Funciones para el modal
  cerrarModal() {
    this.modal.dismiss();
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

  //Función para agregar alumnos
  async addAlumnoAClase() {
    const alumnoData = {
      matricula: this.matricula,
      asistencia: this.asistencia,
    };

    if (!this.selectedMateria || !this.selectedFechaRaw) {
      alert('Seleccione una materia y una fecha antes de agregar un alumno.');
      return;
    }

    this.http
      .post(
        `http://localhost:3000/api/clase/${this.selectedMateria}/fecha/${this.selectedFechaRaw}/alumnos`,
        alumnoData
      )
      .subscribe(
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
