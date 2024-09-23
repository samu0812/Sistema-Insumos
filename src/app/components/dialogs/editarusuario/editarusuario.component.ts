import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';
import { persona } from '../../../models/usuarios/persona';
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
        <input matInput type="date" placeholder="Fecha de Nacimiento" [(ngModel)]="personaEdit.FechaDeNacimiento">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Teléfono</mat-label>
        <input matInput placeholder="Teléfono" [(ngModel)]="personaEdit.Telefono">
      </mat-form-field>
    </ng-container>

    <ng-container *ngIf="data.type === 'editarUsuario'">
      <!-- Aquí agregarás los campos de usuario más adelante -->
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
  personaEdit: persona; // Variable temporal para los cambios

  constructor(
    private alertasService: AlertasService,
    public dialogRef: MatDialogRef<EditarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, user: persona },
    public usuariosService: UsuariosService,

  ) {
    // Crea una copia de los datos originales
    this.personaEdit = { ...data.user }; // Hacemos una copia para evitar modificar directamente los datos originales
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAcceptClick(): void {
    
    if (this.data.type === 'editarPersona') {
      if (!this.personaEdit.Nombre || !this.personaEdit.Apellido || !this.personaEdit.Dni || !this.personaEdit.FechaDeNacimiento || !this.personaEdit.Telefono) {
        this.alertasService.WarningAlert('Campos incompletos', 'Por favor, complete todos los campos antes de continuar.');
        return; // Detener el flujo, no enviar solicitud al back-end
      }
      // Llamada para modificar persona usando la copia de datos
      this.usuariosService.modificarPersona(this.personaEdit).subscribe({
        next: (result) => {
          this.alertasService.OkAlert('Usuario Modificado', 'El usuario fue Modificado exitosamente');
          Object.assign(this.data.user, this.personaEdit); // Copiamos los cambios a los datos originales
          this.dialogRef.close(result); // Cerrar el diálogo con el resultado
        },
        error: (error) => {
          this.alertasService.ErrorAlert('Error', 'No se pudo Modificar el usuario');
        }
      });
    } else if (this.data.type === 'editarUsuario') {
      console.log('Editar Usuario no está implementado aún.');
    }
  }
}
