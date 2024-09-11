import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';


@Component({
  selector: 'app-agregarusuario',
  template: `
  <h1 mat-dialog-title>Agregar Usuario
    <img src="../../../assets/usuarios.png" class="logo">
  </h1>
  <div class="dialog-content" mat-dialog-content>
    <mat-form-field appearance="fill">
      <mat-label>Nombre</mat-label>
      <input matInput placeholder="Nombre">
    </mat-form-field>
    
    <mat-form-field appearance="fill">
      <mat-label>Apellido</mat-label>
      <input matInput placeholder="Apellido">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>DNI</mat-label>
      <input matInput type="number" placeholder="DNI">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Fecha de Nacimiento</mat-label>
      <input matInput type="date" placeholder="Fecha de Nacimiento">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Telefono</mat-label>
      <input matInput type="number" placeholder="Observaciones">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Nombre de Usuario</mat-label>
      <input matInput placeholder="Usuario">
    </mat-form-field>

    <mat-form-field appearance="fill">
      <mat-label>Contraseña</mat-label>
      <input matInput type="password" placeholder="contraseña">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Sede</mat-label>
      <mat-select>
        <mat-option value="nuevo">Formosa</mat-option>
        <mat-option value="usado">Corrientes</mat-option>
        <mat-option value="reparado">Misiones</mat-option>
      </mat-select>
    </mat-form-field>
  
  </div>
  <div mat-dialog-actions class="grupoBtn" align="end">
    <button mat-fab extended (click)="onCancelClick()" class="cancelarBtn">Cancelar</button>
    <button mat-fab extended mat-dialog-close class="aceptarBtn">Aceptar</button>
  </div>
  
    `,
  styleUrl: './agregarusuario.component.css'
})
export class AgregarusuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<AgregarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string }
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}