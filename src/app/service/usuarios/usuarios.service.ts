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
  agregar(persona: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AltaPersona`, persona);
  }

  // Método para modificar una persona
  modificarPersona(persona: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ModificarPersona`, persona);
  }


  inhabilitar(idPersona: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/BajaPersona`, { IdPersona: idPersona });
  }


  habilitar(idPersona: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/HabilitarPersona`, { IdPersona: idPersona });
  }

  // Nuevo método para listar personas con un filtro (SPL_Persona)
  listar(filtro: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/VerPersona`, { Filtro: filtro });
  }
}
