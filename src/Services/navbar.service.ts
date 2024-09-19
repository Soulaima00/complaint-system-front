import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private isAdminSubject = new BehaviorSubject<boolean>(this.getInitialAdminStatus());
  isAdmin$ = this.isAdminSubject.asObservable();

  private getInitialAdminStatus(): boolean {
    const isAdmin = localStorage.getItem('isAdmin');
    return isAdmin === 'true';
  }

  setAdminStatus(isAdmin: boolean) {
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
    this.isAdminSubject.next(isAdmin);
  }

  private linksSubject = new BehaviorSubject<{ name: string; route: string }[]>([
    { name: 'Dashboard', route: '/dashboard' }
  ]);
  
  links$ = this.linksSubject.asObservable();

  setLinks(links: { name: string; route: string }[]) {
    this.linksSubject.next(links);
  }
}
