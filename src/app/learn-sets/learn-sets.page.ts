import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
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
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-learn-sets',
  templateUrl: './learn-sets.page.html',
  styleUrls: ['./learn-sets.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonIcon, RouterLink]
})
export class LearnSetsPage implements OnInit {
  learnSets: any[] = [];

  constructor(private supabaseService: SupabaseService, private router: Router) {
  }

  async ngOnInit() {
    await this.loadLearnSets();
  }

  async ionViewWillEnter() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['updatedLearnSet']) {
      const updatedLearnSet = navigation.extras.state['updatedLearnSet'];
      const index = this.learnSets.findIndex(ls => ls.id === updatedLearnSet.id);
      if (index > -1) {
        this.learnSets[index] = updatedLearnSet;
      } else {
        this.learnSets.push(updatedLearnSet);
      }
    } else {
      await this.loadLearnSets();
    }
  }

  async loadLearnSets() {
    const {data, error} = await this.supabaseService.getClient()
      .from('learn_sets')
      .select('*');

    if (!error) {
      this.learnSets = data || [];
    }
  }

  async deleteLearnSet(index: number) {
    const learnsetToDelete = this.learnSets[index];
    const {error} = await this.supabaseService.getClient()
      .from('learn_sets')
      .delete()
      .eq('id', learnsetToDelete.id);
    this.learnSets.splice(index, 1);
  }

  onFloatingButtonClick() {
    console.log('Floating button clicked!');
    this.router.navigate(['/create-learn-set']);
  }


}
