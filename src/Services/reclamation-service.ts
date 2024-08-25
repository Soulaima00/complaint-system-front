import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IReclamation, ISousTypeReclamation} from "../app/model/reclamation.models";
import * as dayjs from "dayjs";





export type EntityResponseType = HttpResponse<any>;
export type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({ providedIn: 'root' })
export class ReclamationService {
  protected typeReclamationUrl = ('http://localhost:8081/api/type-reclamations');
  protected sousTypeUrl = ('http://localhost:8081/api/sous-type-reclamations');
  protected reclamationUrl = ('http://localhost:8081/api/reclamations');
  protected treatReclamationUrl = ('http://localhost:8081/api/reclamation-treat');

  constructor(protected http: HttpClient) {}

  treat(input: any): Observable<EntityResponseType> {
    return this.http
      .post<any>(this.treatReclamationUrl, input, { observe: 'response' })
      .pipe();
  }
  create(message: string, sousTypeReclamation: ISousTypeReclamation, createdBy: string, image: File): Observable<EntityResponseType> {
    const data: FormData = new FormData();
    if (image !== null && image?.name){
      data.append('file', image, image.name);
    }



    data.append('reclamation', new Blob([JSON.stringify({
      message, sousTypeReclamation, createdBy
    })], { type: 'application/json' }));
    return this.http
      .post<any>(this.reclamationUrl, data, { observe: 'response' })
      .pipe();
  }
  allReclamation(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IReclamation[]>(this.reclamationUrl, {  observe: 'response' })
      .pipe();
  }
  allTypeReclamation(): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(this.typeReclamationUrl, {  observe: 'response' })
      .pipe();
  }
  allSousTypeReclamation(idType: any): Observable<EntityArrayResponseType> {
    return this.http
      .get<any[]>(this.sousTypeUrl+'/'+idType, {  observe: 'response' })
      .pipe();
  }

}
