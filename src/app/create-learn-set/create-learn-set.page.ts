import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase/supabase.service';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

@Component({
  selector: 'app-create-learn-set',
  standalone: true,
  templateUrl: './create-learn-set.page.html',
  styleUrls: ['./create-learn-set.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
})
export class CreateLearnSetPage {
  title: string = '';
  description: string = '';
  imageUrl: string = '';
  flashcards: any[] = [{ question: '', answer: '', answerImage: '', answerAudio: '' }];
  mediaRecorder: any;
  audioChunks: any[] = [];
  isRecording: boolean = false;

  constructor(@Inject(SupabaseService) private supabaseService: SupabaseService, private router: Router) {}

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image?.dataUrl) {
        this.imageUrl = image.dataUrl;
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  async pickImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      if (image?.dataUrl) {
        this.imageUrl = image.dataUrl;
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  }

  async takeAnswerPicture(index: number) {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    if (image.dataUrl) {
      this.flashcards[index].answerImage = image.dataUrl;
    }
  }

  async pickAnswerImage(index: number) {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
    });

    if (image.dataUrl) {
      this.flashcards[index].answerImage = image.dataUrl;
    }
  }

  async startRecording(index: number) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Media devices not supported');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);

      this.audioChunks = [];
      this.mediaRecorder.ondataavailable = (event: any) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        this.flashcards[index].answerAudio = audioUrl;
      };

      this.mediaRecorder.start();
      this.isRecording = true;
    } catch (err) {
      console.error('Error starting audio recording:', err);
    }
  }

  stopRecording(index: number) {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  addFlashcard() {
    this.flashcards.push({ question: '', answer: '', answerImage: '', answerAudio: '' });
  }

  async createLearnSet() {
    const user = await this.supabaseService.getUser();
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const { data, error } = await this.supabaseService.getClient()
      .from('learn_sets')
      .insert({
        title: this.title,
        description: this.description,
        image_url: this.imageUrl,
        flashcards: this.flashcards,
        user_id: user.id,
      });

    if (error) {
      console.error('Error creating learn set:', error);
    } else {
      console.log('Learn set created successfully:', data);
    }

    this.router.navigate(['/learn-sets']);
  }

  async deleteFlashcard(index: number) {
    this.flashcards.splice(index, 1);
  }
}
