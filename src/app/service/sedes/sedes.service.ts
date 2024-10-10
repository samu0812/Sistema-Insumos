import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SedesService {
  
  private apiUrl = 'http://localhost:1433'; 

  constructor(private http: HttpClient) {}

  listarSedes(filtro: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/VerSedes`, { Filtro: filtro });
  }
}
