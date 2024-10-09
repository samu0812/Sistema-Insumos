import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //private apiUrl = 'https://cr0dcgq7-1433.brs.devtunnels.ms'; // Cambia esto a la URL de tu API
  private apiUrl = 'http://localhost:1433'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para dar de alta una persona
  agregar(persona: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AltaPersona`, persona, { observe: 'response' });
  }

  // Método para modificar una persona
  modificarPersona(persona: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ModificarPersona`, persona, { observe: 'response' });
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

    // Método para dar de alta un usuario (SPA_Usuario)
  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AltaUsuario`, usuario, { observe: 'response' });
  }
  
  // Método para modificar un usuario (SPM_Usuario)
  modificarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ModificarUsuario`, usuario, { observe: 'response' });
  }

  listarUsuario(filtro: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/VerUsuario`, { Filtro: filtro });
  }

  inhabilitarUsuario(idUsuario: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/BajaUsuario`, { IdUsuario: idUsuario });
  }


  habilitarUsuario(idUsuario: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/HabilitarUsuario`, { IdUsuario: idUsuario });
  }
}
