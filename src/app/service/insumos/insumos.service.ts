import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private apiUrl = 'http://localhost:1433'; 

  constructor(private http: HttpClient) { }

  // Alta de insumo
  agregarInsumo(insumo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/AltaInsumo`, insumo, { observe: 'response' });
  }

  // Ver insumo
  listarInsumo(filtro: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/VerInsumo`, { Filtro: filtro });
  }

  // Baja de insumo
  inhabilitarInsumo(idInsumo: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/BajaInsumo`, { idInsumo: idInsumo }, { observe: 'response' });
  }

  // Modificar insumo
  modificarInsumo(insumo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ModificarInsumo`, insumo, { observe: 'response' });
  }

  // Habilitar insumo
  habilitarInsumo(idInsumo: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/HabilitarInsumo`, { idInsumo: idInsumo }, { observe: 'response' });
  }

  listarCondicionInsumo(filtro: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/VerCondicionInsumo`, { FiltroCondicionInsumo: filtro });
  }

  listarEstado(filtro: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/VerEstado`, { FiltroEstado: filtro });
  }

  listarTipoInsumo(filtro: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/VerTipoInsumo`, { FiltroTipoInsumo: filtro });
  }
  
}
