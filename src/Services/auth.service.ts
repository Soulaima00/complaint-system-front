import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { User } from 'src/app/model/user';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EncryptionService } from './encryption.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getInitialLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private user: User | null = null;
  encryptedData = "";
  decryptedData = "";

  constructor(
    private userServ: UserServiceService,
    private encryptionService: EncryptionService,
    private router: Router
  ) {}

  private getInitialLoginStatus(): boolean {
    return localStorage.getItem('logged') === '1';
  }

  encrypt(dataToEncrypt: any) {
    this.encryptedData = this.encryptionService.encryptData(dataToEncrypt);
    return this.encryptedData;
  }

  decrypt() {
    this.decryptedData = this.encryptionService.decryptData(this.encryptedData);
    console.log('Données déchiffrées:', this.decryptedData);
  }

  authenticate(login: string, password: string): Observable<boolean> {
    return this.userServ.findUserByEmail(login).pipe(
      map((user: User | null) => {
        console.warn('User fetched from service:', user);

        if (user && user.password === password) {
          this.isLoggedInSubject.next(true);
          localStorage.setItem('logged', '1');
          localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');
          localStorage.setItem('ve1', user.email);
          localStorage.setItem('vn', `${user.lastName} ${user.firstName}`);
          localStorage.setItem('vi2', user.id.toString());

          this.user = user;
          return true;
        } else {
          this.isLoggedInSubject.next(false);
          localStorage.setItem('logged', '0');
          return false;
        }
      }),
      catchError(() => {
        this.isLoggedInSubject.next(false);
        localStorage.setItem('logged', '0');
        return of(false);
      })
    );
  }

  getIsAdmin(): boolean {
    const isAdmin = localStorage.getItem('isAdmin');
    return isAdmin === 'true';
  }

  getLoginStatus(): boolean {
    return this.isLoggedInSubject.value;
  }

  getUser(): User | null {
    return this.user;
  }


  logout() {
    localStorage.removeItem('logged');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('ve1');
    localStorage.removeItem('vn');
    localStorage.removeItem('vi2');
  
    this.isLoggedInSubject.next(false); // Notify subscribers
    this.user = null;
  
    console.log('Logged out, state updated'); // For debugging
    this.router.navigate(['/login']);
  }
  }
