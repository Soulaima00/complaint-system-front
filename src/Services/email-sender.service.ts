import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {

  private apiUrl = 'http://localhost:8081/api/reset-password';

  constructor(private http: HttpClient) { }
  sendEmail(to: string, subject: string, text: string): Observable<any> {
    const body = { to, subject, text };
    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );;
  }
  private handleError(error: any): Observable<never> {
    // Vous pouvez loguer l'erreur ici si nécessaire
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
 //     alert(this.message);
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.body}`;
      if(error.status==202){
        Swal.fire('Well !', 'Mail sent successfully !', 'success');

      }
      else
        Swal.fire('Error !', 'Error Occured !', 'error');

      }
 // Affichez l'erreur dans la console pour le débogage
  // Retournez une erreur Observable
 return throwError(() => new Error(errorMessage));
}
 
   
}
