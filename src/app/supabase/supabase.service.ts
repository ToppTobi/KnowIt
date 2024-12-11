import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const SUPABASE_URL = 'https://xnascnbnsxfeunglophc.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuYXNjbmJuc3hmZXVuZ2xvcGhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NTA0ODEsImV4cCI6MjA0OTMyNjQ4MX0.ji4KXAlsO42xIuwtWwITJ7KRoPHHU2IuluCWRWevMhQ';

    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        storage: localStorage,
      },
    });
  }

  async getLearnSets() {
    const { data, error } = await this.supabase
      .from('learn_sets')
      .select('*');
    if (error) {
      console.error('Error fetching learn sets:', error);
      return [];
    }
    return data;
  }



  getClient(): SupabaseClient {
    return this.supabase;
  }
}
