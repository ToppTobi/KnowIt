import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {SupabaseService} from "./supabase/supabase.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.supabaseService.getUser();
    if (user) {
      return true;
    } else {
      this.router.navigate(['/user']);
      return false;
    }
  }
}
