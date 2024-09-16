import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-parametrosdialog',
  template: `
  <h1>Agregar Parámetro
    <img src="../../../../assets/parametros.png" class="logo">
  </h1>
  
  <div class="dialog-content" mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Tipo de Parámetro</mat-label>
        <mat-select>
        <mat-option value="Devuelto">Tipo Prestario</mat-option>
        <mat-option value="Extender Fecha">Condicion</mat-option>
        <mat-option value="reparado">Estado</mat-option>
      </mat-select>
      </mat-form-field>


      <mat-form-field appearance="fill">
        <mat-label>Descipción</mat-label>
        <input matInput placeholder="Descipción">
      </mat-form-field>

  </div>
  
  <div mat-dialog-actions class="grupoBtn" align="end">
  <button mat-fab extended (click)="onCancelClick()" class="cancelarBtn">Cancelar</button>
  <button mat-fab extended mat-dialog-close class="aceptarBtn">Aceptar</button>
</div>
`,
  styleUrl: './parametrosdialog.component.css'
})
export class ParametrosdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ParametrosdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}