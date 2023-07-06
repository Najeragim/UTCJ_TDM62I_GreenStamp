import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabnavAdminPage } from './tabnav-admin.page';

describe('TabnavAdminPage', () => {
  let component: TabnavAdminPage;
  let fixture: ComponentFixture<TabnavAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabnavAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
