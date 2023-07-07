import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asis',
  templateUrl: './asis.page.html',
  styleUrls: ['./asis.page.scss'],
})
export class AsisPage implements OnInit {

  constructor(private router: Router){}

  ngOnInit() {
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
}
