import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private matricula = new BehaviorSubject<string>('');
  actualMatricula = this.matricula.asObservable();

  constructor() { }

  actualizarMatricula(matricula: string) {
    this.matricula.next(matricula);
  }
}
