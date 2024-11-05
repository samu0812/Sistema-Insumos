import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from '../../../service/usuarios/usuarios.service';
import { persona } from '../../../models/usuarios/persona';
import { Usuario } from '../../../models/usuarios/usuario';
import { AlertasService } from '../../../service/alertas/alertas.service';
import { SedesService } from '../../../service/sedes/sedes.service';
import { RolService } from '../../../service/rol/rol.service';
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

      <mat-form-field appearance="fill">
        <mat-label>Correo Electronico</mat-label>
        <input matInput placeholder="Correo" type="email" [(ngModel)]="personaEdit.Email">
      </mat-form-field>
    </ng-container>

    <ng-container *ngIf="data.type === 'editarUsuario'">
  <mat-form-field appearance="fill">
    <mat-label>Usuario</mat-label>
    <input matInput placeholder="Usuario" [(ngModel)]="usuarioEdit.Usuario">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Clave Actual</mat-label>
    <input matInput placeholder="Clave" [(ngModel)]="usuarioEdit.ClaveActual" type="password">
  </mat-form-field>

  <mat-form-field appearance="fill">
        <mat-label>Clave Nueva</mat-label>
        <input matInput [(ngModel)]="usuarioEdit.NuevaClave" type="password" >
      </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Sede</mat-label>
    <mat-select [(ngModel)]="usuarioEdit.IdSede">
            <mat-option *ngFor="let sede of sedes" [value]="sede.IdSedes">{{ sede.Descripcion }}</mat-option>
          </mat-select>
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Rol</mat-label>
    <mat-select [(ngModel)]="usuarioEdit.IdRol">
            <mat-option *ngFor="let rol of roles" [value]="rol.IdRol">{{ rol.Descripcion }}</mat-option>
          </mat-select>
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
  sedes: any[] = [];
  roles: any[] = [];

  constructor(
    private alertasService: AlertasService,
    public dialogRef: MatDialogRef<EditarusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string, user: persona | Usuario },
    public usuariosService: UsuariosService,
    private sedesService: SedesService,
    private RolService: RolService
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
    this.RolService.listarRol('1').subscribe({
      next: (response) => {
        this.roles = response || []; // Asignar las sedes directamente
        console.log('roles recibidos:', response); // Mostrar las sedes en consola
      },
      error: (error) => {
        this.alertasService.mostrarAlerta('500', 'Error', 'Error al cargar las sedes');
      }
    });
  
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
    } else if (this.data.type === 'editarUsuario') {
      if (!this.usuarioEdit.Usuario || !this.usuarioEdit.ClaveActual || !this.usuarioEdit.NuevaClave || !this.usuarioEdit.IdSede || !this.usuarioEdit.IdRol) {
        this.alertasService.WarningAlert('Campos incompletos', 'Por favor, complete todos los campos antes de continuar.');
        console.log(this.usuarioEdit);
        return;
      }

      this.usuariosService.modificarUsuario(this.usuarioEdit).subscribe({
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
}