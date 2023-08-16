import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatriculaService } from 'src/app/services/matricula.service';

@Component({
  selector: 'app-tabnav-alumno',
  templateUrl: './tabnav-alumno.page.html',
  styleUrls: ['./tabnav-alumno.page.scss'],
})
export class TabnavAlumnoPage implements OnInit {
  matricula: string = ''; // Inicializar la variable con un valor por defecto

  constructor(private route: ActivatedRoute, private matriculaService: MatriculaService) { }

  ngOnInit() {
    this.matriculaService.actualMatricula.subscribe(matricula => {
      this.matricula = matricula;
    });
  }
}
