import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {SupabaseService} from "../supabase/supabase.service";

@Component({
  selector: 'app-learn-sets',
  templateUrl: './learn-sets.page.html',
  styleUrls: ['./learn-sets.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonIcon]
})
export class LearnSetsPage implements OnInit {
  learnSets: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

async ngOnInit() {
    this.learnSets = await this.supabaseService.getLearnSets();
  }

}
