// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  authenticate(login: string, password: string): boolean {
    if ((login === 'admin' && password === 'admin') || 
        (login === 'aymen' && password === 'aymen')) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }
}
