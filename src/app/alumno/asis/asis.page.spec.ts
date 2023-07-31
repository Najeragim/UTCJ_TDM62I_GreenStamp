import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsisPage } from './asis.page';

describe('AsisPage', () => {
  let component: AsisPage;
  let fixture: ComponentFixture<AsisPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(AsisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
  