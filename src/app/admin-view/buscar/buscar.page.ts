import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonModal } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

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
    private loadingController: LoadingController,
    private alertService: AlertService
  ) {
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
    this.http.get<string[]>('https://green-stamp-api.onrender.com/api/materias').subscribe(
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
      this.http.get<any[]>(`https://green-stamp-api.onrender.com/api/materia/${this.selectedMateria}/fechas`).subscribe(
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
        .get<any[]>(`https://green-stamp-api.onrender.com/api/materia/${this.selectedMateria}/fecha/${this.selectedFechaRaw}/alumnos`)
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

  goToLogin() {
    this.router.navigate(['/login'])
  }

  //Función para agregar alumnos
  async addAlumnoAClase() {

    if (!this.matricula) {
      // Validación de campos
      this.alertService.validarCampos();
      return;
    }
    const alumnoData = {
      matricula: this.matricula,
      asistencia: this.asistencia,
    };

    if (!this.selectedMateria || !this.selectedFechaRaw) {
      this.alertService.validarMateriaFecha();
      return;
    }

    // Verificar si la matrícula del alumno existe en la base de datos
    this.http.get(`https://green-stamp-api.onrender.com/api/alumno/${this.matricula}/existe`).subscribe(
      async (response) => {
        // Verificar si el alumno ya está en la lista de alumnos de la clase
        const alumnoInClass = this.listaAlumnos.some(alumno => alumno.matricula === this.matricula);

        if (alumnoInClass) {
          this.alertService.alumnoYaInscritoEnClase();
        }

        // Agregar el alumno a la clase
        this.http.post(`https://green-stamp-api.onrender.com/api/clase/${this.selectedMateria}/fecha/${this.selectedFechaRaw}/alumnos`, alumnoData).subscribe(
          (response) => {
            this.alertService.alumnoInscritoEnClase();
            this.fetchAlumnos(); // Actualizar la lista de alumnos
          },
          (error) => {
            this.alertService.errorAgregarAlumnoClase();
            console.error('Error:', error);
          }
        );

        this.cerrarModal();
      },
      async (error) => {
        // La matrícula no existe, mostrar una alerta
        this.alertService.errorAlumnoNotFound();
      }
    );
  }


}
