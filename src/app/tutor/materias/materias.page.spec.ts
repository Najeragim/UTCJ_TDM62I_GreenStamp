import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MateriasPage } from './materias.page';

describe('MateriasPage', () => {
  let component: MateriasPage;
  let fixture: ComponentFixture<MateriasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MateriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
