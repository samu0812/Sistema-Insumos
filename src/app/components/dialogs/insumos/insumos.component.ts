import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { InsumosService } from '../../../service/insumos/insumos.service';
import { AlertasService } from '../../../service/alertas/alertas.service';

@Component({
  selector: 'insumos-dialog',
  template: `
<h1>Agregar Insumo
  <img src="../../../assets/insumos.png" class="logo">
</h1>
<div class="dialog-content" mat-dialog-content>
  <mat-form-field appearance="fill">
    <mat-label>Nombre del Insumo</mat-label>
    <input matInput placeholder="Nombre"  [(ngModel)]="insumoNuevo.NombreInsumo">
  </mat-form-field>
  
  <mat-form-field appearance="fill">
    <mat-label>Código</mat-label>
    <input matInput placeholder="Codigo"  [(ngModel)]="insumoNuevo.Codigo">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Descripción</mat-label>
    <input matInput placeholder="Descripcion"  [(ngModel)]="insumoNuevo.Descripcion">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Marca</mat-label>
    <input matInput placeholder="Marca"  [(ngModel)]="insumoNuevo.Marca">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Observaciones</mat-label>
    <input matInput placeholder="Observaciones"  [(ngModel)]="insumoNuevo.Observacion">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Cantidad</mat-label>
    <input matInput type="number" placeholder="Cantidad"  [(ngModel)]="insumoNuevo.Cantidad">
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Tipo de Insumo</mat-label>
    <mat-select [(ngModel)]="insumoNuevo.IdTipoInsumo">
      <mat-option value=1>Ram</mat-option>
      <mat-option value=2>Procesador</mat-option>
      <mat-option value=3>Pc</mat-option>
    </mat-select>
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Condición</mat-label>
    <mat-select [(ngModel)]="insumoNuevo.IdCondicionInsumo">
      <mat-option value=1>Nuevo</mat-option>
      <mat-option value=2>Usado</mat-option>
      <mat-option value=3>Reparado</mat-option>
    </mat-select>
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Estado</mat-label>
    <mat-select [(ngModel)]="insumoNuevo.IdEstado">
      <mat-option value=1>Ocupado</mat-option>
      <mat-option value=2>No Devuelto</mat-option>
      <mat-option value=3>Disponible</mat-option>
    </mat-select>
  </mat-form-field>

  <mat-form-field appearance="fill">
    <mat-label>Ubicación</mat-label>
    <mat-select [(ngModel)]="insumoNuevo.Ubicacion_Sedes_IdSedes">
      <mat-option value=1>Sala 1</mat-option>
      <mat-option value=2>Sala 2</mat-option>
      <mat-option value=3>Sala 3</mat-option>
    </mat-select>
  </mat-form-field>

</div>

<div mat-dialog-actions class="grupoBtn" align="end">
  <button mat-fab extended (click)="onCancelClick()" class="cancelarBtn">Cancelar</button>
  <button mat-fab extended (click)="agregarInsumo()" class="aceptarBtn">Aceptar</button>
</div>


  `,
  styleUrls: ['./insumos.component.css']
})
export class AgregarinsumosComponent {
  insumoNuevo = {
    NombreInsumo: '',
    Codigo: '',
    Descripcion: '',
    Marca: '',
    Observacion: '',
    Cantidad: 0,
    IdTipoInsumo: 0,
    IdCondicionInsumo: 0,
    IdEstado: 0,
    Ubicacion_Sedes_IdSedes: 0,
  };
  
  constructor(
    public dialogRef: MatDialogRef<AgregarinsumosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string },
    private insumosService: InsumosService,
    private alertasService: AlertasService
  ) {}


  onCancelClick(): void {
    this.dialogRef.close();
  }

  // Método para agregar el insumo
  agregarInsumo(): void {
    this.insumosService.agregarInsumo(this.insumoNuevo).subscribe({
      next: (result) => {
        const mensaje = result.message;
        const status = result.status;

        // Llamamos al servicio para mostrar la alerta según el status
        this.alertasService.mostrarAlerta(status, 'Resultado', mensaje);

        this.dialogRef.close(result);
      },
      error: (error) => {
        const status = error.status;
        const mensaje = error.body?.message || 'No se pudo agregar el Insumo';
        this.alertasService.mostrarAlerta(status, 'Error', mensaje);
      }
    });
  }
}
