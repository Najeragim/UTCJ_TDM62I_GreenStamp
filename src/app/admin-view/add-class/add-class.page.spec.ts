import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddClassPage } from './add-class.page';

describe('AddClassPage', () => {
  let component: AddClassPage;
  let fixture: ComponentFixture<AddClassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
