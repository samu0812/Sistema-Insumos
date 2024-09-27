import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';
import { persona } from '../../../models/usuarios/persona';
import { Usuario } from '../../../models/usuarios/usuario';
import { AlertasService } from '../../../service/alertas/alertas.service';

@Component({
  selector: 'app-editarusuario',
  template: `
  <h1 *ngIf="data.type === 'editarUsuario' || data.type === 'editarPersona'">
    Editar {{ data.type === 'editarPersona' ? 'Persona' : 'Usuario' }}
    <img src="../../../../assets/usuarios.png" class="logo">
  </h1>

  <div class="dialog-content" mat-dialog-content>
    <ng-container *ngIf="data.type === 'editarPersona'">
      <mat-form-field appearance="fill">
        <mat-label>Nombre</mat-label>
        <input matInput placeholder="Nombre" [(ngModel)]="personaEdit.Nombre">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Apellido</mat-label>
        <input matInput placeholder="Apellido" [(ngModel)]="personaEdit.Apellido">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>DNI</mat-label>
        <input matInput type="number" placeholder="DNI" [(ngModel)]="personaEdit.Dni">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Fecha de Nacimiento</mat-label>
        <input matInput type="date" [(ngModel)]="personaEdit.FechaDeNacimiento">
      </mat-form-field>


      <mat-form-field appearance="fill">
        <mat-label>Teléfono</mat-label>
        <input matInput placeholder="Teléfono" [(ngModel)]="personaEdit.Telefono">
      </mat-form-field>
    </ng-container>

    <ng-container *ngIf="data.type === 'editarUsuario'">
  <mat-form-field appearance="fill">
    <mat-label>Usuario</mat-label>
    <input matInput placeholder="Usuario" [(ngModel)]="usuarioEdit.Usuario">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Clave</mat-label>
    <input matInput placeholder="Clave" [(ngModel)]="usuarioEdit.Clave" type="password">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Sede</mat-label>
    <input matInput placeholder="ID Sede" [(ngModel)]="usuarioEdit.IdSede" type="number">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Rol</mat-label>
    <input matInput placeholder="ID Tipo Rol" [(ngModel)]="usuarioEdit.TipoRol_idTipoRol" type="number">
  </mat-form-field>
</ng-container>

  </div>

  <div mat-dialog-actions align="end" class="grupoBtn">
    <button mat-button class="cancelarBtn" (click)="onCancelClick()">Cancelar</button>
    <button mat-button class="aceptarBtn" (click)="onAcceptClick()">Aceptar</button>
  </div>
  `,
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent {
  personaEdit!: persona; // El operador ! asegura que TypeScript no lanzará el error
  usuarioEdit!: Usuario;

  constructor(
    private alertasService: AlertasService,
    public dialogRef: MatDialogRef<EditarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, user: persona | Usuario },
    public usuariosService: UsuariosService
  ) {
    if (this.data.type === 'editarPersona') {
      this.personaEdit = { ...data.user as persona };
  
      // Conversión de la fecha
      if (this.personaEdit.FechaDeNacimiento) {
        const fechaParts = this.personaEdit.FechaDeNacimiento.split('/');
        this.personaEdit.FechaDeNacimiento = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`; // Cambiar a formato YYYY-MM-DD
      }
      
    } else if (this.data.type === 'editarUsuario') {
      this.usuarioEdit = { ...data.user as Usuario };  // Asignación de los datos para usuario
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAcceptClick(): void {
    if (this.data.type === 'editarPersona') {
      if (!this.personaEdit.Nombre || !this.personaEdit.Apellido || !this.personaEdit.Dni || !this.personaEdit.FechaDeNacimiento || !this.personaEdit.Telefono) {
        this.alertasService.WarningAlert('Campos incompletos', 'Por favor, complete todos los campos antes de continuar.');
        return;
      }

      this.usuariosService.modificarPersona(this.personaEdit).subscribe({
        next: (result) => {
          const mensaje = result.message;
          const status = result.status;

          if (status === '200') {
            this.alertasService.OkAlert('Éxito', mensaje);
          } else {
            this.alertasService.ErrorAlert('Error', mensaje);
          }

          Object.assign(this.data.user, this.personaEdit);
          this.dialogRef.close(result);
        },
        error: (error) => {
          this.alertasService.ErrorAlert('Error', 'No se pudo modificar la persona.');
        }
      });
    } else if (this.data.type === 'editarUsuario') {
      if (!this.usuarioEdit.Usuario || !this.usuarioEdit.Clave || !this.usuarioEdit.IdSede || !this.usuarioEdit.TipoRol_idTipoRol) {
        this.alertasService.WarningAlert('Campos incompletos', 'Por favor, complete todos los campos antes de continuar.');
        return;
      }

      this.usuariosService.modificarUsuario(this.usuarioEdit).subscribe({
        next: (result) => {
          const mensaje = result.message;
          const status = result.status;

          if (status === '200') {
            this.alertasService.OkAlert('Éxito', mensaje);
          } else {
            this.alertasService.ErrorAlert('Error', mensaje);
          }

          Object.assign(this.data.user, this.usuarioEdit);
          this.dialogRef.close(result);
        },
        error: (error) => {
          this.alertasService.ErrorAlert('Error', 'No se pudo modificar el usuario.');
        }
      });
    }
  }
}