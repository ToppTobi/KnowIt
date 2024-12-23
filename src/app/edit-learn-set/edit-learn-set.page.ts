import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SupabaseService} from '../supabase/supabase.service';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-edit-learn-set',
  templateUrl: './edit-learn-set.page.html',
  styleUrls: ['./edit-learn-set.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink],
})
export class EditLearnSetPage implements OnInit {
  title: string = '';
  description: string = '';
  imageUrl: string = '';
  flashcards: any[] = [];
  learnSetId: string | null = null;
  userId: string | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const user = await this.supabaseService.getUser();
    if (user) {
      this.userId = user.id;
      this.learnSetId = this.route.snapshot.paramMap.get('id');
      if (this.learnSetId) {
        await this.loadLearnSet(this.learnSetId);
      }
    } else {
      console.error('User not authenticated');
      this.router.navigate(['/user']);
    }
  }

  async loadLearnSet(id: string) {
    const {data, error} = await this.supabaseService.getClient()
      .from('learn_sets')
      .select('*')
      .eq('id', id)
      .eq('user_id', this.userId) // Nur Datensätze des aktuellen Benutzers laden
      .single();

    if (!error && data) {
      this.title = data.title;
      this.description = data.description;
      this.imageUrl = data.image_url;
      this.flashcards = typeof data.flashcards === 'string'
        ? JSON.parse(data.flashcards)
        : data.flashcards || [];
    } else {
      console.error('Error loading learn set:', error);
    }
  }

  async uploadImage(event: any) {
    const file = event.target.files[0];
    const filePath = `learn-sets/${file.name}`;
    const checkResult = await this.supabaseService.getClient()
      .storage
      .from('images')
      .list('learn-sets', {search: file.name});

    if (checkResult.data && checkResult.data.length > 0) {
      const {data: publicData} = this.supabaseService.getClient()
        .storage
        .from('images')
        .getPublicUrl(filePath);
      this.imageUrl = publicData?.publicUrl || '';
    } else {
      const {data, error} = await this.supabaseService.getClient()
        .storage
        .from('images')
        .upload(filePath, file);

      if (!error) {
        const {data: publicData} = this.supabaseService.getClient()
          .storage
          .from('images')
          .getPublicUrl(filePath);
        this.imageUrl = publicData?.publicUrl || '';
      }
    }

    if (this.learnSetId) {
      await this.supabaseService.getClient()
        .from('learn_sets')
        .update({image_url: this.imageUrl})
        .eq('id', this.learnSetId)
        .eq('user_id', this.userId);
    }

    this.cdr.detectChanges();
  }

  addFlashcard() {
    this.flashcards.push({question: '', answer: '', answerImage: '', audio: ''});
  }

  async saveLearnSet() {
    if (this.learnSetId) {
      const {data, error} = await this.supabaseService.getClient()
        .from('learn_sets')
        .update({
          title: this.title,
          description: this.description,
          image_url: this.imageUrl,
          flashcards: JSON.stringify(this.flashcards),
        })
        .eq('id', this.learnSetId)
        .eq('user_id', this.userId);

      if (!error) {
        const {data: updatedData} = await this.supabaseService.getClient()
          .from('learn_sets')
          .select('*')
          .eq('id', this.learnSetId)
          .single();

        if (updatedData) {
          this.router.navigate(['/learn-sets'], {state: {updatedLearnSet: updatedData}});
        }
      } else {
        console.error('Error updating learn set:', error);
      }
    }
  }

  async deleteFlashcard(index: number) {
    this.flashcards.splice(index, 1);

    const {error} = await this.supabaseService.getClient()
      .from('learn_sets')
      .update({flashcards: JSON.stringify(this.flashcards)})
      .eq('id', this.learnSetId)
      .eq('user_id', this.userId);

    if (error) {
      console.error('Error updating flashcards:', error);
    }
  }
}
