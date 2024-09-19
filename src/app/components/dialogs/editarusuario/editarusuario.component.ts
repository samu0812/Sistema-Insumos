import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';
import { persona } from '../../../models/usuarios/persona';

@Component({
  selector: 'app-editarusuario',
  template: `
  <h1 *ngIf="data.type === 'editar' || data.type === 'editarDatos'">
    Editar Usuario
    <img src="../../../../assets/usuarios.png" class="logo">
  </h1>

  <div class="dialog-content" mat-dialog-content>
    <!-- Campos para Agregar Usuario y Editar Datos Personales -->
    <ng-container *ngIf="data.type === 'editarDatos'">
      <mat-form-field appearance="fill">
        <mat-label>Nombre</mat-label>
        <input matInput placeholder="Nombre" [(ngModel)]="data.user.nombre">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Apellido</mat-label>
        <input matInput placeholder="Apellido" [(ngModel)]="data.user.apellido">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>DNI</mat-label>
        <input matInput type="number" placeholder="DNI" [(ngModel)]="data.user.dni">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Fecha de Nacimiento</mat-label>
        <input matInput type="date" placeholder="Fecha de Nacimiento" [(ngModel)]="data.user.fechaDeNacimiento">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Telefono</mat-label>
        <input matInput placeholder="Telefono" >
      </mat-form-field>
    </ng-container>

    <!-- Campos para Editar Usuario -->
    <ng-container *ngIf="data.type === 'editar'">
      <mat-form-field appearance="fill">
        <mat-label>Usuario</mat-label>
        <input matInput placeholder="Usuario" >
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Contraseña</mat-label>
        <input matInput type="password" placeholder="Contraseña">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Sede</mat-label>
        <mat-select >
          <mat-option value="Formosa">Formosa</mat-option>
          <mat-option value="Corrientes">Corrientes</mat-option>
          <mat-option value="Misiones">Misiones</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Rol</mat-label>
        <mat-select >
          <mat-option value="Admin">Admin</mat-option>
          <mat-option value="Usuario">Usuario</mat-option>
          <mat-option value="Invitado">Invitado</mat-option>
        </mat-select>
      </mat-form-field>
    </ng-container>
  </div>

  <div mat-dialog-actions align="end" class="grupoBtn">
    <button mat-button class="cancelarBtn" (click)="onCancelClick()">Cancelar</button>
    <button mat-button class="aceptarBtn" (click)="agregar()">Aceptar</button>
  </div>
`,
  styleUrl: './editarusuario.component.css'
})
export class EditarusuarioComponent {
  constructor(
    public dialogRef: MatDialogRef<EditarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, user: persona },
    public usuariosService: UsuariosService
  ) {}

  agregar(): void {
    if (this.data.type === 'agregar') {
      this.usuariosService.altaPersona(this.data.user).subscribe({
        next: (response) => {
          console.log(this.data);
          console.log('Usuario agregado exitosamente', response);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error al agregar usuario', error);
        }
      });
    } else if (this.data.type === 'editarDatos') {
      this.usuariosService.modificarPersona(this.data.user).subscribe({
        next: (response) => {
          console.log('Usuario modificado exitosamente', response);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error al modificar usuario', error);
        }
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
