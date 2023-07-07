import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.page.html',
  styleUrls: ['./horarios.page.scss'],
})
export class HorariosPage implements OnInit {

  constructor(private router: Router){}

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
}
