import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<User
  > {
    return this.http.post<User>(`${this.baseUrl}/signup`, user);
  }
  findUserByEmail(email: string): Observable<User | null> {
    return this.http.get<User | null>(`${this.baseUrl}/findByEmail/${email}`);
  }
}
