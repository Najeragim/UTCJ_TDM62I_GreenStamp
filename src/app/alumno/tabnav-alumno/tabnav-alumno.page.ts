import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabnav-alumno',
  templateUrl: './tabnav-alumno.page.html',
  styleUrls: ['./tabnav-alumno.page.scss'],
})
export class TabnavAlumnoPage implements OnInit {
  userId: string = ''; // Inicializar la variable con un valor por defecto

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId']; // Acceder al ID del alumno desde los parámetros de la URL
    });
  }
}
