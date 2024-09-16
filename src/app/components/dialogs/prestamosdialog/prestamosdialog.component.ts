import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-prestamosdialog',
  template: `
  <h1>Devolución
    <img src="../../../../assets/prestamo.png" class="logo">
  </h1>
  
  <div class="dialog-content" mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Estado</mat-label>
        <mat-select>
        <mat-option value="Devuelto">Nuevo</mat-option>
        <mat-option value="Extender Fecha">Usado</mat-option>
        <mat-option value="reparado">Reparado</mat-option>
      </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Condición</mat-label>
        <mat-select>
        <mat-option value="Sin Daños">Sin Daños</mat-option>
        <mat-option value="Dañado">Dañado</mat-option>
      </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Observaciones</mat-label>
        <input matInput placeholder="Observaciones">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Fecha de Devolución</mat-label>
        <input matInput type="date" placeholder="Cantidad">
      </mat-form-field>

  </div>
  
  <div mat-dialog-actions class="grupoBtn" align="end">
  <button mat-fab extended (click)="onCancelClick()" class="cancelarBtn">Cancelar</button>
  <button mat-fab extended mat-dialog-close class="aceptarBtn">Aceptar</button>
</div>
`,
  styleUrl: './prestamosdialog.component.css'
})
export class PrestamosdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PrestamosdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}