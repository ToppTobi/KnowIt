import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutIfNotSignedInPage } from './layout-if-not-signed-in.page';

describe('LayoutIfNotSignedInPage', () => {
  let component: LayoutIfNotSignedInPage;
  let fixture: ComponentFixture<LayoutIfNotSignedInPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutIfNotSignedInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
