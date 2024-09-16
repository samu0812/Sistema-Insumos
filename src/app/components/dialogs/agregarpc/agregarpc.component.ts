import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'agregarpc-dialog',
  template: `
  <ng-container class="contenedorDialog">
  <h1>Agregar PC
  <img src="../../../assets/agregarPC.png" class="logo">
  </h1>
  <div mat-dialog-content>
    <mat-tab-group>
      
      <mat-tab label="PC">
        <div class="bodyDialog">
        <mat-form-field appearance="fill">
          <mat-label>Nombre del PC</mat-label>
          <input matInput placeholder="Nombre">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Código</mat-label>
          <input matInput  placeholder="Codigo">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Descrición</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
        </div>
      </mat-tab>

      <mat-tab label="Memoria RAM">
      <div class="bodyDialog">
      <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput placeholder="Nombre">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Código</mat-label>
          <input matInput  placeholder="Codigo">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Descrición</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Marca</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Observación</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
      </div>
      </mat-tab>

      <mat-tab label="Placa Madre">
      <div class="bodyDialog">
      <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput placeholder="Nombre">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Código</mat-label>
          <input matInput  placeholder="Codigo">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Descrición</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Marca</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Observación</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
      </div>
      </mat-tab>

      <mat-tab label="Procesador">
      <div class="bodyDialog">
      <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput placeholder="Nombre">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Código</mat-label>
          <input matInput  placeholder="Codigo">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Descrición</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Marca</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Observación</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
      </div>
      </mat-tab>

      <mat-tab label="Almacenamiento">
      <div class="bodyDialog">
      <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput placeholder="Nombre">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Código</mat-label>
          <input matInput  placeholder="Codigo">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Descrición</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Marca</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Observación</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
      </div>
      </mat-tab>

      <mat-tab label="Placa de Video">
      <div class="bodyDialog">
      <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput placeholder="Nombre">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Código</mat-label>
          <input matInput  placeholder="Codigo">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Descrición</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Marca</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Observación</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
      </div>
      </mat-tab>
      
      <mat-tab label="Fuente de Alimentación">
      <div class="bodyDialog">
      <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput placeholder="Nombre">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Código</mat-label>
          <input matInput  placeholder="Codigo">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Descrición</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Marca</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Observación</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
      </div>
      </mat-tab>

      
      <mat-tab label="Ventiladores">
      <div class="bodyDialog">
      <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput placeholder="Nombre">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Código</mat-label>
          <input matInput  placeholder="Codigo">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Descrición</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Marca</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Observación</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
      </div>
      </mat-tab>

      
      <mat-tab label="Sistema OP">
      <div class="bodyDialog">
      <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput placeholder="Nombre">
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Descrición</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
      </div>
      </mat-tab>

      <mat-tab label="Periféricos">
        <div class="bodyDialog">
      <mat-form-field appearance="fill">
          <mat-label>Monitor</mat-label>
          <input matInput placeholder="Tipo de socket">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Mouse</mat-label>
          <input matInput placeholder="Modelo">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Teclado</mat-label>
          <input matInput placeholder="Tipo de socket">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Audio</mat-label>
          <input matInput placeholder="Tipo de socket">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Condición</mat-label>
          <mat-select>
            <mat-option value="nuevo">Nuevo</mat-option>
            <mat-option value="usado">Usado</mat-option>
            <mat-option value="reparado">Reparado</mat-option>
          </mat-select>
          </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Observación</mat-label>
          <input matInput placeholder="Descriçion">
        </mat-form-field>
        </div>
      </mat-tab>
      

    </mat-tab-group>
  </div>
  <div mat-dialog-actions class="grupoBtn" align="end">
    <button mat-fab extended (click)="onCancelClick()" class="cancelarBtn">Cancelar</button>
    <button mat-fab extended mat-dialog-close class="aceptarBtn">Aceptar</button>
  </div>
  </ng-container>
  `,
  styleUrls: ['./agregarpc.component.css']
})
export class AgregarPcComponent {
  constructor(
    public dialogRef: MatDialogRef<AgregarPcComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
