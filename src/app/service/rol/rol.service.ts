import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl = 'http://localhost:1433'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) { }

  listarRol(filtro: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ListarRol`, { FiltroRol: filtro });
  }
}
