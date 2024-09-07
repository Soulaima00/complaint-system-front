import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const logged = localStorage.getItem('logged');
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (logged === '1') {
      if (state.url === '/treat'|| state.url=='/charts') {
        if (isAdmin === 'true') {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      } else if (['/claim', '/dashboard', '/follow'].includes(state.url)) {
        if (isAdmin === 'false') {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
 