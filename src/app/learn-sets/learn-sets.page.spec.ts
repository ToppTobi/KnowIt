import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnSetsPage } from './learn-sets.page';

describe('LearnSetsPage', () => {
  let component: LearnSetsPage;
  let fixture: ComponentFixture<LearnSetsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnSetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
