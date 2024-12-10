import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ],
})
export class LearnFlashcardsPage implements OnInit {
  flashcards: any[] = [];
  currentCardIndex: number = 0;
  learnSetId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    this.learnSetId = this.route.snapshot.paramMap.get('id');
    if (this.learnSetId) {
      await this.loadFlashcards(this.learnSetId);
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
    }
  }

  showNextCard() {
    if (this.currentCardIndex < this.flashcards.length - 1) {
      this.currentCardIndex++;
    }
  }

  showPreviousCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
    }
  }
}
