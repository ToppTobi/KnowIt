import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase/supabase.service';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-create-learn-set',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './create-learn-set.page.html',
  styleUrls: ['./create-learn-set.page.scss'],
})
export class CreateLearnSetPage {
  title: string = '';
  description: string = '';
  imageUrl: string = '';
  flashcards: any[] = [{ question: '', answer: '', answerImage: '', audio: '' }];

  constructor(private supabaseService: SupabaseService) {}

  async uploadImage(event: any) {
    const file = event.target.files[0];
    const { data, error } = await this.supabaseService.getClient()
      .storage.from('images')
      .upload(`learn-sets/${file.name}`, file);

    if (error) {
      console.error('Error uploading image:', error);
    } else {
      this.imageUrl = data.path;
    }
  }

  async uploadAudio(event: any, index: number) {
    const file = event.target.files[0];
    const { data, error } = await this.supabaseService.getClient()
      .storage.from('audio')
      .upload(`flashcards/${file.name}`, file);

    if (error) {
      console.error('Error uploading audio:', error);
    } else {
      this.flashcards[index].audio = data.path;
    }
  }

  async uploadAnswerImage(event: any, index: number) {
    const file = event.target.files[0];
    const { data, error } = await this.supabaseService.getClient()
      .storage.from('images')
      .upload(`flashcards/${file.name}`, file);

    if (error) {
      console.error('Error uploading answer image:', error);
    } else {
      this.flashcards[index].answerImage = data.path;
    }
  }

  addFlashcard() {
    this.flashcards.push({ question: '', answer: '', answerImage: '', audio: '' });
  }

  async createLearnSet() {
    const { data, error } = await this.supabaseService.getClient()
      .from('learn_sets')
      .insert({
        title: this.title,
        description: this.description,
        image_url: this.imageUrl,
        flashcards: this.flashcards,
      });

    if (error) {
      console.error('Error creating learn set:', error);
    } else {
      console.log('Learn set created successfully:', data);
    }
  }
}
