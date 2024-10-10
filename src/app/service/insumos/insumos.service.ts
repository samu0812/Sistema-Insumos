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
    const url = `${this.apiUrl}/AltaInsumo`;
    return this.http.post(url, insumo, { observe: 'response' });
  }

  // Ver insumo
  listarInsumo(filtro: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/VerInsumo`, { Filtro: filtro });
  }

  // Baja de insumo
  inhabilitarInsumo(idInsumo: number): Observable<any> {
    const url = `${this.apiUrl}/BajaInsumo`;
    return this.http.post(url, { IdInsumos: idInsumo }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Modificar insumo
  modificarInsumo(insumo: any): Observable<any> {
    const url = `${this.apiUrl}/ModificarInsumo`;
    return this.http.post(url, insumo, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Habilitar insumo
  habilitarInsumo(idInsumo: number): Observable<any> {
    const url = `${this.apiUrl}/HabilitarInsumo`;
    return this.http.post(url, { IdInsumos: idInsumo }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
