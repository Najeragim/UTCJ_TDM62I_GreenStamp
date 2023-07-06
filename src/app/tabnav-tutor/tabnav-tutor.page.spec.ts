import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabnavTutorPage } from './tabnav-tutor.page';

describe('TabnavTutorPage', () => {
  let component: TabnavTutorPage;
  let fixture: ComponentFixture<TabnavTutorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabnavTutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
