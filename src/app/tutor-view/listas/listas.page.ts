import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient

@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
})
export class ListasPage implements OnInit {

  clase: any; // Variable para almacenar los detalles de la clase

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // ID de la clase
    const claseId = '64cc3f464204e0e6952450e3';
    
    // Realiza la solicitud para obtener los detalles de la clase por su ID
    this.http.get(`http://localhost:3000/api/clase/${claseId}`).subscribe((data) => {
      this.clase = data;
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

