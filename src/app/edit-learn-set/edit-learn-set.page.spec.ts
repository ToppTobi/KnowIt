import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditLearnSetPage } from './edit-learn-set.page';

describe('EditLearnSetPage', () => {
  let component: EditLearnSetPage;
  let fixture: ComponentFixture<EditLearnSetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLearnSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
