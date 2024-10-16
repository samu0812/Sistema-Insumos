import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';
import { AlertasService } from '../../../service/alertas/alertas.service';
import { SedesService } from '../../../service/sedes/sedes.service'; // Importa el servicio de sedes

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
          <mat-select [(ngModel)]="usuarioParaAgregar.IdSede">
            <mat-option *ngFor="let sede of sedes" [value]="sede.IdSedes">{{ sede.Descripcion }}</mat-option>
          </mat-select>
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
export class AgregarusuarioComponent implements OnInit {

  usuarioParaAgregar = {
    Usuario: '',
    Clave: '',
    IdPersona: '', // Aquí se asignará el IdPersona
    IdSede: null,
    TipoRol_idTipoRol: ''
  };

  sedes: any[] = []; // Aquí guardaremos las sedes obtenidas del servicio

  constructor(
    public dialogRef: MatDialogRef<AgregarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Recibe el idPersona
    private usuariosService: UsuariosService,
    private alertasService: AlertasService,
    private sedesService: SedesService // Inyectamos el servicio de sedes
  ) {
    // Asignar el IdPersona recibido al modelo
    this.usuarioParaAgregar.IdPersona = this.data.idPersona;
  }

  ngOnInit(): void {
    // Cargar las sedes desde el servicio con filtro '1'
    this.sedesService.listarSedes('1').subscribe({
      next: (response) => {
        this.sedes = response || []; // Asignar las sedes directamente
        console.log('Sedes recibidas:', response); // Mostrar las sedes en consola
      },
      error: (error) => {
        this.alertasService.mostrarAlerta('500', 'Error', 'Error al cargar las sedes');
      }
    });
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
