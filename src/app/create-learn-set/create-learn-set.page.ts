import {Component, Inject} from '@angular/core';
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



constructor(@Inject(SupabaseService) private supabaseService: SupabaseService) {}

  async uploadImage(event: any) {
    const file = event.target.files[0];
    const filePath = `learn-sets/${file.name}`;

    // Datei hochladen
    const { data: uploadData, error: uploadError } = await this.supabaseService.getClient()
      .storage.from('images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Fehler beim Hochladen des Bildes:', uploadError.message);
      return;
    }

    // Öffentliche URL abrufen
    const publicUrl = this.supabaseService.getClient()
      .storage.from('images')
      .getPublicUrl(filePath).data.publicUrl;

    if (!publicUrl) {
      console.error('Fehler: Öffentliche URL konnte nicht abgerufen werden');
      return;
    }

    // Speichern der öffentlichen URL
    this.imageUrl = publicUrl;
    console.log('Öffentliche URL:', this.imageUrl);
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
