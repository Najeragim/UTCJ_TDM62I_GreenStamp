import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {

  constructor(private router: Router){}

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

}
