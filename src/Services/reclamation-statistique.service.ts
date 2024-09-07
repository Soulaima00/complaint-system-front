import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationStatistiqueService {
  private baseUrl = 'http://localhost:8081/api/statistiques';  

  constructor(private http: HttpClient) { }
  getSousReclamationsStatistiques(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sous-reclamations-statistiques`);
  }
  getReclamationsBySituation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/par-situation`);
  }

  getReclamationsByMonth(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/par-mois`);
  }
  getReclamationsByCreator(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-creator`);
  }
}