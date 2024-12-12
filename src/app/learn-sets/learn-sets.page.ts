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
  IonToolbar,
} from '@ionic/angular/standalone';
import { SupabaseService } from '../supabase/supabase.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-learn-sets',
  templateUrl: './learn-sets.page.html',
  styleUrls: ['./learn-sets.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenuButton,
    IonIcon,
    RouterLink,
  ],
})
export class LearnSetsPage implements OnInit {
  learnSets: any[] = [];
  userId: string | null = null;

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async ngOnInit() {
    const user = await this.supabaseService.getUser();
    if (user) {
      this.userId = user.id;
      await this.loadLearnSets();
    } else {
      console.error('User is not logged in');
    }
  }


  async loadLearnSets() {
    const user = await this.supabaseService.getUser();
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const { data, error } = await this.supabaseService.getClient()
      .from('learn_sets')
      .select('*')
      .eq('user_id', user.id);

    if (!error) {
      this.learnSets = data || [];
    } else {
      console.error('Error loading learn sets:', error);
    }
  }




  async deleteLearnSet(index: number) {
    const learnsetToDelete = this.learnSets[index];

    if (!learnsetToDelete || !learnsetToDelete.id) {
      console.error('Invalid learn set to delete.');
      return;
    }

    const { error } = await this.supabaseService.getClient()
      .from('learn_sets')
      .delete()
      .eq('id', learnsetToDelete.id)
      .eq('user_id', this.userId); // Nur wenn `user_id` übereinstimmt

    if (!error) {
      this.learnSets.splice(index, 1);
      console.log('Learn set deleted successfully.');
    } else {
      console.error('Error deleting learn set:', error);
    }
  }



  onFloatingButtonClick() {
    this.router.navigate(['/create-learn-set']);
  }
}
