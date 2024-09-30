
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable } from 'rxjs';
  
  @Injectable({
    providedIn: 'root'
  })
  export class LoginService {
  
  private apiUrl = 'http://localhost:1433'; // Reemplaza con la URL de tu API
  
    constructor(private http: HttpClient) { }
  
    login(usuario: string, clave: string): Observable<any> {
      const body = { Usuario: usuario, Clave: clave };
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
      return this.http.post(`${this.apiUrl}/login`, body, { headers });
    }
  }
  