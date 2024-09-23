import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';
import { AlertasService } from '../../../service/alertas/alertas.service';

@Component({
  selector: 'app-agregarusuario',
  template: `
    <h1>Agregar Usuario
      <img src="../../../../assets/usuarios.png" class="logo">
    </h1>

    <div class="dialog-content" mat-dialog-content>
      <ng-container>
      <mat-form-field appearance="fill">
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="personaParaAgregar.nombre" placeholder="Nombre">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Apellido</mat-label>
        <input matInput [(ngModel)]="personaParaAgregar.apellido" placeholder="Apellido">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>DNI</mat-label>
        <input matInput type="number" [(ngModel)]="personaParaAgregar.dni" placeholder="DNI">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Fecha de Nacimiento</mat-label>
        <input matInput type="date" [(ngModel)]="personaParaAgregar.fechaDeNacimiento" placeholder="Fecha de Nacimiento">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Teléfono</mat-label>
        <input matInput [(ngModel)]="personaParaAgregar.telefono" placeholder="Teléfono">
      </mat-form-field>

      </ng-container>
      </div>

      <div mat-dialog-actions align="end" class="grupoBtn">
        <button mat-button class="cancelarBtn" (click)="onCancelClick()">Cancelar</button>
        <button mat-button class="aceptarBtn" (click)="agregar()">Aceptar</button>
      </div>
  `,
  styleUrls: ['./agregarusuario.component.css'],
})
export class AgregarusuarioComponent {
  
  personaParaAgregar = {
    nombre: '',
    apellido: '',
    dni: '',
    fechaDeNacimiento: '',
    telefono: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AgregarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usuariosService: UsuariosService,
    private alertasService: AlertasService
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  agregar(): void {
    // Validación: verificar que todos los campos estén completos
    if (!this.personaParaAgregar.nombre || !this.personaParaAgregar.apellido || !this.personaParaAgregar.dni || !this.personaParaAgregar.fechaDeNacimiento || !this.personaParaAgregar.telefono) {
      this.alertasService.WarningAlert('Campos incompletos', 'Por favor, complete todos los campos antes de continuar.');
      return; // Detener el flujo, no enviar solicitud al back-end
    }

    // Si todos los campos están completos, hacer la solicitud al back-end
    this.usuariosService.agregar(this.personaParaAgregar).subscribe(
      (response) => {
        console.log(this.personaParaAgregar)
        this.alertasService.OkAlert('Usuario agregado', 'El usuario fue agregado exitosamente');
        console.log('Persona agregada exitosamente', response);
        this.dialogRef.close(response); // Cierra el diálogo y devuelve la respuesta
      },
      (error) => {
        this.alertasService.ErrorAlert('Error', 'No se pudo agregar el usuario');
        console.error('Error al agregar la persona', error);
      }
    );
  }
}

