import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'insumos-dialog',
  template: `
<h1>Agregar Insumo
  <img src="../../../assets/insumos.png" class="logo">
</h1>
<div class="dialog-content" mat-dialog-content>
  <mat-form-field appearance="fill">
    <mat-label>Nombre del Insumo</mat-label>
    <input matInput placeholder="Nombre">
  </mat-form-field>
  
  <mat-form-field appearance="fill">
    <mat-label>Código</mat-label>
    <input matInput placeholder="Codigo">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Descripción</mat-label>
    <input matInput placeholder="Descripcion">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Marca</mat-label>
    <input matInput placeholder="Marca">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Observaciones</mat-label>
    <input matInput placeholder="Observaciones">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Cantidad</mat-label>
    <input matInput type="number" placeholder="Cantidad">
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
<div mat-dialog-actions class="grupoBtn" align="end">
  <button mat-fab extended (click)="onCancelClick()" class="cancelarBtn">Cancelar</button>
  <button mat-fab extended mat-dialog-close class="aceptarBtn">Aceptar</button>
</div>

  `,
  styleUrls: ['./insumos.component.css']
})
export class AgregarinsumosComponent {
  constructor(
    public dialogRef: MatDialogRef<AgregarinsumosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string }
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
