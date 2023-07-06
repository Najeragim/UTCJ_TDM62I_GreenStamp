import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfPage } from './prof.page';

describe('ProfPage', () => {
  let component: ProfPage;
  let fixture: ComponentFixture<ProfPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
