import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UserData {
  nombre?: string;
  apellido?: string;
  dni?: number;
  fechaNacimiento?: string;
  usuario?: string;
  sede?: string;
  rol?: string;
}

@Component({
  selector: 'app-agregarusuario',
  template: `
    <h1 mat-dialog-title *ngIf="data.type === 'agregar' || data.type === 'editarDatos'">
      {{ data.type === 'agregar' ? 'Agregar Usuario' : 'Editar Usuario' }}
      <img src="../../../../assets/usuarios.png" class="logo">
    </h1>
    <h1 mat-dialog-title *ngIf="data.type === 'editar'">
      Editar Usuario
      <img src="../../../../assets/usuarios.png" class="logo">
    </h1>

    <div class="dialog-content" mat-dialog-content>
      <!-- Campos para Agregar Usuario y Editar Datos Personales -->
      <ng-container *ngIf="data.type === 'agregar' || data.type === 'editarDatos'">
        <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput placeholder="Nombre" [value]="data.user?.nombre || ''">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Apellido</mat-label>
          <input matInput placeholder="Apellido" [value]="data.user?.apellido || ''">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>DNI</mat-label>
          <input matInput type="number" placeholder="DNI" [value]="data.user?.dni || ''">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Fecha de Nacimiento</mat-label>
          <input matInput type="date" placeholder="Fecha de Nacimiento" [value]="data.user?.fechaNacimiento || ''">
        </mat-form-field>
      </ng-container>

      <!-- Campos para Editar Usuario -->
      <ng-container *ngIf="data.type === 'editar'">
        <mat-form-field appearance="fill">
          <mat-label>Usuario</mat-label>
          <input matInput placeholder="Usuario" [value]="data.user?.usuario || ''">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Contraseña</mat-label>
          <input matInput type="password" placeholder="Contraseña">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Sede</mat-label>
          <mat-select [value]="data.user?.sede || ''">
            <mat-option value="Formosa">Formosa</mat-option>
            <mat-option value="Corrientes">Corrientes</mat-option>
            <mat-option value="Misiones">Misiones</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Rol</mat-label>
          <mat-select [value]="data.user?.rol || ''">
            <mat-option value="Admin">Admin</mat-option>
            <mat-option value="Usuario">Usuario</mat-option>
            <mat-option value="Invitado">Invitado</mat-option>
          </mat-select>
        </mat-form-field>
      </ng-container>
    </div>

    <div mat-dialog-actions align="end" class="grupoBtn">
      <button mat-button class="cancelarBtn" (click)="onCancelClick()">Cancelar</button>
      <button mat-button class="aceptarBtn" mat-dialog-close>Aceptar</button>
    </div>
  `,
  styleUrls: ['./agregarusuario.component.css'],
})
export class AgregarusuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<AgregarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, user: UserData }
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
