import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase/supabase.service';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-create-learn-set',
  standalone: true,
  templateUrl: './create-learn-set.page.html',
  styleUrls: ['./create-learn-set.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
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


    const checkResult = await this.supabaseService.getClient()
      .storage
      .from('images')
      .list('learn-sets', { search: file.name });

    if (checkResult.data && checkResult.data.length > 0) {
      const { data: publicData } = this.supabaseService.getClient()
        .storage
        .from('images')
        .getPublicUrl(filePath);

      this.imageUrl = publicData?.publicUrl || '';
      console.log('Using existing file URL:', this.imageUrl);
      return;
    }


    const { data, error } = await this.supabaseService.getClient()
      .storage
      .from('images')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      return;
    }


    const { data: publicData } = this.supabaseService.getClient()
      .storage
      .from('images')
      .getPublicUrl(filePath);

    this.imageUrl = publicData?.publicUrl || '';
    console.log('Uploaded new file and set URL:', this.imageUrl);
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
