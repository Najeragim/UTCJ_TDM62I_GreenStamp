import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  obtenerEstadoClase(claseId: string) {
    this.http
      .get<any>(`/api/clase/${claseId}/estado`) // Cambia la ruta según tu configuración
      .subscribe(
        (response) => {
          const estado = response.estado;
          console.log(`El estado de la clase es: ${estado}`);
          // Aquí puedes manejar el estado como desees, por ejemplo, mostrándolo en el HTML
        },
        (error) => {
          console.error('Error al obtener el estado de la clase:', error);
          // Manejo del error
        }
      );
  }
}
