import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';
import { AlertasService } from '../../../service/alertas/alertas.service';

@Component({
  selector: 'app-agregarpersona',
  template: `
    <h1>Agregar Persona
      <img src="../../../../assets/usuarios.png" class="logo">
    </h1>

    <div class="dialog-content" mat-dialog-content>
      <ng-container>
      <mat-form-field appearance="fill">
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="personaParaAgregar.Nombre" placeholder="Nombre">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Apellido</mat-label>
        <input matInput [(ngModel)]="personaParaAgregar.Apellido" placeholder="Apellido">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>DNI</mat-label>
        <input matInput type="number" [(ngModel)]="personaParaAgregar.Dni" placeholder="DNI">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Fecha de Nacimiento</mat-label>
        <input matInput type="date" [(ngModel)]="personaParaAgregar.FechaDeNacimiento" placeholder="Fecha de Nacimiento">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Teléfono</mat-label>
        <input matInput [(ngModel)]="personaParaAgregar.Telefono" placeholder="Teléfono">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput type="email" [(ngModel)]="personaParaAgregar.Email" placeholder="Email">
      </mat-form-field>

      </ng-container>
      </div>

      <div mat-dialog-actions align="end" class="grupoBtn">
        <button mat-button class="cancelarBtn" (click)="onCancelClick()">Cancelar</button>
        <button mat-button class="aceptarBtn" (click)="agregar()">Aceptar</button>
      </div>
  `,
  styleUrls: ['./agregarpersona.component.css'],
})
export class AgregarpersonaComponent {
  
  personaParaAgregar = {
    Nombre: '',
    Apellido: '',
    Dni: '',
    FechaDeNacimiento: '',
    Telefono: '',
    Email: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AgregarpersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usuariosService: UsuariosService,
    private alertasService: AlertasService
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  agregar(): void {
    if (!this.personaParaAgregar.Nombre || !this.personaParaAgregar.Apellido || !this.personaParaAgregar.Dni || 
        !this.personaParaAgregar.FechaDeNacimiento || !this.personaParaAgregar.Telefono || !this.personaParaAgregar.Email) {
      this.alertasService.WarningAlert('Campos incompletos', 'Por favor, complete todos los campos antes de continuar.');
      return;
    }
  
    this.usuariosService.agregar(this.personaParaAgregar).subscribe({
      next: (response) => {
        const mensaje = response.body.message;
        const status = response.body.status;
  
        // Mostrar alerta según el estado recibido
        this.alertasService.mostrarAlerta(status.toString(), 'Ok', mensaje);
        this.dialogRef.close(response.body);  // Cierra el diálogo con la respuesta
      },
      error: (error) => {
        const status = error.status || 500;
        const mensaje = error.error?.message || 'Error al agregar la persona';
        this.alertasService.mostrarAlerta(status.toString(), 'Error', mensaje);
      }
    });
  }
  
  
  
}

