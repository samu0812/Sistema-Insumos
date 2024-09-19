import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:1433'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para dar de alta una persona
  altaPersona(persona: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AltaPersona`, persona);
  }

  // Método para modificar una persona
  modificarPersona(persona: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ModificarPersona`, persona);
  }
}