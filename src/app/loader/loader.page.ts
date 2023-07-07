import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {
  showProgressBar: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Simula una operación que toma un tiempo
    setTimeout(() => {
      this.showProgressBar = false;
      // Después de que termine el tiempo del spinner, el contenido se mostrará con la transición
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 100); // Tiempo en milisegundos (0.1 segundos en este ejemplo)
    }, 2000); // Tiempo en milisegundos (2 segundos en este ejemplo)
  }
}
