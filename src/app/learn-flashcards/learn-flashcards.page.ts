import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { SupabaseService } from '../supabase/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-learn-flashcards',
  templateUrl: './learn-flashcards.page.html',
  styleUrls: ['./learn-flashcards.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class LearnFlashcardsPage implements OnInit {
  flashcards: any[] = [];
  wrongFlashcards: any[] = [];
  currentCardIndex: number = 0;
  learnSetId: string | null = null;
  solvedCorrectCount = 0;
  solvedWrongCount = 0;
  isRotated: boolean = false;
  learnSetTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    this.learnSetId = this.route.snapshot.paramMap.get('id');
    if (this.learnSetId) {
      await this.loadFlashcards(this.learnSetId);
      await this.loadLearnSetTitle(this.learnSetId);
    }
  }

  async loadLearnSetTitle(id: string) {
    const { data, error } = await this.supabaseService.getClient()
      .from('learn_sets')
      .select('title')
      .eq('id', id)
      .single();

    if (!error && data) {
      this.learnSetTitle = data.title;
    } else {
      this.learnSetTitle = 'Unknown Learn Set';
    }
  }

  async loadFlashcards(id: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('learn_sets')
      .select('flashcards')
      .eq('id', id)
      .single();

    if (!error) {
      this.flashcards =
        typeof data.flashcards === 'string'
          ? JSON.parse(data.flashcards)
          : data.flashcards || [];
      this.wrongFlashcards = [];
    }
  }

  rotateCard() {
    this.isRotated = !this.isRotated;
  }

  solvedRight() {
    if (this.currentCardIndex < this.flashcards.length) {
      this.solvedCorrectCount++;
      this.nextCard();
    }
  }

  getCorrectPercentage(): number {
    const totalCards = this.solvedCorrectCount + this.solvedWrongCount;
    if (totalCards === 0) {
      return 0;
    }
    return Math.round((this.solvedCorrectCount / totalCards) * 100);
  }

  solvedWrong() {
    if (this.currentCardIndex < this.flashcards.length) {
      this.solvedWrongCount++;
      this.wrongFlashcards.push(this.flashcards[this.currentCardIndex]);
      this.nextCard();
    }
  }

  getWrongPercentage(): number {
    const totalCards = this.solvedCorrectCount + this.solvedWrongCount;
    if (totalCards === 0) {
      return 0;
    }
    return Math.round((this.solvedWrongCount / totalCards) * 100);
  }


  nextCard() {
    if (this.currentCardIndex < this.flashcards.length - 1) {
      this.currentCardIndex++;
    } else {
      this.flashcards = [];
    }
    this.isRotated = false;
  }

  retryWrong() {
    this.flashcards = [...this.wrongFlashcards];
    this.wrongFlashcards = [];
    this.currentCardIndex = 0;
    this.solvedCorrectCount = 0;
    this.solvedWrongCount = 0;
  }

  async retryAll() {
    if (this.learnSetId) {
      await this.loadFlashcards(this.learnSetId);
      this.wrongFlashcards = [];
      this.currentCardIndex = 0;
      this.solvedCorrectCount = 0;
      this.solvedWrongCount = 0;
    }
  }

}
