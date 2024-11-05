import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertasService } from '../../../service/alertas/alertas.service';
import { UsuariosService } from '../../../service/usuarios/usuarios.service'; // Asegúrate de importar tu servicio
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para manejar formularios

@Component({
  selector: 'app-cambiarclave',
  template:  `
  <h1>Cambiar Clave
    <img src="../../../../assets/clave.png" class="logo">
  </h1>

  <div class="dialog-content" mat-dialog-content>
    <form [formGroup]="claveForm"> <!-- Vincula el formulario al FormGroup -->
      <mat-form-field appearance="fill">
        <mat-label>Clave Actual</mat-label>
        <input matInput formControlName="claveActual" placeholder="Clave" type="password"> <!-- Usa formControlName -->
        <mat-error *ngIf="claveForm.controls['claveActual'].invalid && claveForm.controls['claveActual'].touched">
          Clave actual es requerida
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Clave Nueva</mat-label>
        <input matInput formControlName="claveNueva" type="password" placeholder="Clave Nueva">
        <mat-error *ngIf="claveForm.controls['claveNueva'].invalid && claveForm.controls['claveNueva'].touched">
          Clave nueva es requerida
        </mat-error>
      </mat-form-field>
    </form>
  </div>

  <div mat-dialog-actions align="end" class="grupoBtn">
    <button mat-button class="cancelarBtn" (click)="onCancelar()">Cancelar</button>
    <button mat-button class="aceptarBtn" [disabled]="claveForm.invalid" (click)="onAceptar()">Aceptar</button> <!-- Desactiva si el formulario es inválido -->
  </div>
`,
  styleUrls: ['./cambiarclave.component.css']
})
export class CambiarclaveComponent implements OnInit {
  
  claveForm!: FormGroup;  // FormGroup para manejar el formulario

  constructor(
    private dialogRef: MatDialogRef<CambiarclaveComponent>,
    private usuariosService: UsuariosService, // Inyectar el servicio UsuariosService
    private alertasService: AlertasService, // Inyectar AlertasService para mostrar mensajes
    private fb: FormBuilder // FormBuilder para crear el formulario
  ) {}

  ngOnInit(): void {
    this.claveForm = this.fb.group({
      claveActual: ['', Validators.required], // Validar que la clave actual sea requerida
      claveNueva: ['', Validators.required]    // Validar que la nueva clave sea requerida
    });
  }

  // Método para cancelar y cerrar el diálogo
  onCancelar(): void {
    this.dialogRef.close();
  }

  // Método para aceptar y cambiar la clave
  onAceptar(): void {
    if (this.claveForm.valid) {
      const claveData = {
        IdUsuario: 27, // Aquí puedes pasar dinámicamente el ID del usuario autenticado
        ClaveActual: this.claveForm.value.claveActual,
        NuevaClave: this.claveForm.value.claveNueva
      };

      // Llamar al servicio cambiarClave
      this.usuariosService.cambiarClave(claveData).subscribe({
        next: (response) => {
          const mensaje = response.body.message;
          const status = response.body.status;
    
          // Mostrar alerta según el estado recibido
          this.alertasService.mostrarAlerta(status.toString(), 'Ok', mensaje);
          this.dialogRef.close(response.body);  // Cierra el diálogo con la respuesta
        },
        error: (error) => {
          const status = error.status || 500;
          const mensaje = error.error?.message || 'Error al cambiar la contraseña';
          this.alertasService.mostrarAlerta(status.toString(), 'Error', mensaje);
        }
      });
    }
  }
}
