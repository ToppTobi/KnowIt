import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnFlashcardsPage } from './learn-flashcards.page';

describe('LearnFlashcardsPage', () => {
  let component: LearnFlashcardsPage;
  let fixture: ComponentFixture<LearnFlashcardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnFlashcardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
