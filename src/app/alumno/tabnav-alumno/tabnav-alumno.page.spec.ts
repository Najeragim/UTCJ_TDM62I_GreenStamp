import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabnavAlumnoPage } from './tabnav-alumno.page';

describe('TabnavAlumnoPage', () => {
  let component: TabnavAlumnoPage;
  let fixture: ComponentFixture<TabnavAlumnoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabnavAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
