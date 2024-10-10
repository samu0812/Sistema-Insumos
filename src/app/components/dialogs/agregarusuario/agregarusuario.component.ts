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
        <mat-label>Usuario</mat-label>
        <input matInput [(ngModel)]="usuarioParaAgregar.Usuario" placeholder="Usuario">
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Clave</mat-label>
        <input matInput [(ngModel)]="usuarioParaAgregar.Clave" type="password" placeholder="Clave">
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Sede</mat-label>
        <input matInput [(ngModel)]="usuarioParaAgregar.IdSede" type="number" placeholder="ID de Sede">
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Rol</mat-label>
        <input matInput [(ngModel)]="usuarioParaAgregar.TipoRol_idTipoRol" type="number" placeholder="ID de Rol">
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

  usuarioParaAgregar = {
    Usuario: '',
    Clave: '',
    IdPersona: '', // Aquí se asignará el IdPersona
    IdSede: '',
    TipoRol_idTipoRol: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AgregarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibe el idPersona
    private usuariosService: UsuariosService,
    private alertasService: AlertasService
  ) {
    // Asignar el IdPersona recibido al modelo
    this.usuarioParaAgregar.IdPersona = this.data.idPersona;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  agregar(): void {
    // Verificar si todos los campos necesarios están completos
    if (!this.usuarioParaAgregar.Usuario || !this.usuarioParaAgregar.Clave || !this.usuarioParaAgregar.IdSede || !this.usuarioParaAgregar.TipoRol_idTipoRol) {
      this.alertasService.WarningAlert('Campos incompletos', 'Por favor, complete todos los campos antes de continuar.');
      return;
    }

    // Llamar al servicio para agregar el usuario
    this.usuariosService.agregarUsuario(this.usuarioParaAgregar).subscribe({
      next: (result) => {
        const mensaje = result.message;
        const status = result.status;

        // Llamamos al servicio para mostrar la alerta según el status
        this.alertasService.mostrarAlerta(status, 'Resultado', mensaje);

        this.dialogRef.close(result);
      },
      error: (error) => {
        const status = error.status;
        const mensaje = error.body?.message || 'No se pudo agregar el usuario';
        this.alertasService.mostrarAlerta(status, 'Error', mensaje);
      }
    });
  }
}

