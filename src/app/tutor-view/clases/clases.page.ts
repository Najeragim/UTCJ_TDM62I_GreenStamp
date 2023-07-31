import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {

  constructor(private router: Router){}

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
}

