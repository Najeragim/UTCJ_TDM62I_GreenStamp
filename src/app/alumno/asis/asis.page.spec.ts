import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsisPage } from './asis.page';

describe('AsisPage', () => {
  let component: AsisPage;
  let fixture: ComponentFixture<AsisPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
