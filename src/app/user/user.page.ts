import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {
  IonButtons, IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonMenuButton,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, IonLabel, IonInput, IonButtons, IonToolbar, IonHeader, IonMenuButton, IonTitle, IonContent],
})
export class UserPage implements OnInit {
  email: string = '';
  password: string = '';
  user: any = null;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    this.user = await this.supabaseService.getUser();
    if (!this.user) {
      console.error('User not logged in');
    }
  }


  async login() {
    const { error, data } = await this.supabaseService.signIn(this.email, this.password);
    if (error) {
      console.error('Login error:', error.message);
    } else {
      console.log('User logged in:', data);
      this.user = data.user;
    }
  }

  async signUp() {
    const { error, data } = await this.supabaseService.signUp(this.email, this.password);
    if (error) {
      console.error('Sign Up error:', error.message);
    } else {
      console.log('User signed up:', data);
      this.user = data.user;
    }
  }

  async logout() {
    const { error } = await this.supabaseService.signOut();
    if (error) {
      console.error('Logout error:', error.message);
    } else {
      console.log('User logged out');
      this.user = null;
    }
  }
}
