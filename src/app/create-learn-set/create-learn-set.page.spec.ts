  import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLearnSetPage } from './create-learn-set.page';

describe('CreateLearnSetPage', () => {
  let component: CreateLearnSetPage;
  let fixture: ComponentFixture<CreateLearnSetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLearnSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
