import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-learn-flashcards',
  templateUrl: './learn-flashcards.page.html',
  styleUrls: ['./learn-flashcards.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LearnFlashcardsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
