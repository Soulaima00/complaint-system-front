import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { User } from 'src/app/model/user';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private user: User | null = null;
  encryptedData=""
  decryptedData=""
  constructor(private userServ: UserServiceService,private encryptionService: EncryptionService) {}
  encrypt(dataToEncrypt:any) {
     this.encryptedData = this.encryptionService.encryptData(dataToEncrypt);
 return this.encryptedData
    }

  decrypt() {
    this.decryptedData = this.encryptionService.decryptData(this.encryptedData);
    console.log('Données déchiffrées:', this.decryptedData);
  }
  authenticate(login: string, password: string): Observable<boolean> {
    // Call UserServiceService to validate user credentials
    return this.userServ.findUserByEmail(login).pipe(
      map((user: User | null) => {
        console.warn('User fetched from service:', user);

        if (user && user.password === password) {
          this.isLoggedIn = true;
          localStorage.setItem("logged", "1");
           localStorage.setItem("isAdmin", user.isAdmin ? "true" : "false"); // Properly handle boolean
          localStorage.setItem("ve1",   user.email);
          localStorage.setItem("vn",   user.lastName+" "+user.firstName);
          localStorage.setItem("vi2",   user.id+"");
          
          this.user = user;  
          return true;
        } else {
          this.isLoggedIn = false;
          return false;
        }
      }),
      catchError(() => {
        this.isLoggedIn = false;
        return of(false);
      })
    );
  }

  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }

  getUser(): User | null {
    return this.user;
  }
}
 