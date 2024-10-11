import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsumosService } from '../../../service/insumos/insumos.service';

@Component({
  selector: 'app-editarinsumo',
  template: `
  <h1>Agregar Insumo
    <img src="../../../assets/insumos.png" class="logo">
  </h1>
  <div class="dialog-content" mat-dialog-content>
    <mat-form-field appearance="fill">
      <mat-label>Nombre del Insumo</mat-label>
      <input matInput placeholder="Nombre"  [(ngModel)]="insumo.NombreInsumo">
    </mat-form-field>
    
    <mat-form-field appearance="fill">
      <mat-label>Código</mat-label>
      <input matInput placeholder="Codigo"  [(ngModel)]="insumo.Codigo">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Descripción</mat-label>
      <input matInput placeholder="Descripcion"  [(ngModel)]="insumo.Descripcion">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Marca</mat-label>
      <input matInput placeholder="Marca"  [(ngModel)]="insumo.Marca">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Observaciones</mat-label>
      <input matInput placeholder="Observaciones"  [(ngModel)]="insumo.Observacion">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Cantidad</mat-label>
      <input matInput type="number" placeholder="Cantidad"  [(ngModel)]="insumo.Cantidad">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Tipo de Insumo</mat-label>
      <mat-select [(ngModel)]="insumo.IdTipoInsumo">
        <mat-option value=1>Ram</mat-option>
        <mat-option value=2>Procesador</mat-option>
        <mat-option value=3>Pc</mat-option>
      </mat-select>
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Condición</mat-label>
      <mat-select [(ngModel)]="insumo.IdCondicionInsumo">
        <mat-option value=1>Nuevo</mat-option>
        <mat-option value=2>Usado</mat-option>
        <mat-option value=3>Reparado</mat-option>
      </mat-select>
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Estado</mat-label>
      <mat-select [(ngModel)]="insumo.IdEstado">
        <mat-option value=1>Ocupado</mat-option>
        <mat-option value=2>No Devuelto</mat-option>
        <mat-option value=3>Disponible</mat-option>
      </mat-select>
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Ubicación</mat-label>
      <mat-select [(ngModel)]="insumo.Ubicacion_Sedes_IdSedes">
        <mat-option value=1>Sala 1</mat-option>
        <mat-option value=2>Sala 2</mat-option>
        <mat-option value=3>Sala 3</mat-option>
      </mat-select>
    </mat-form-field>
  
  </div>
<mat-dialog-actions>
  <button mat-button (click)="onNoClick()">Cancelar</button>
  <button mat-button (click)="modificarInsumo()">Guardar</button>
</mat-dialog-actions>

`,
  styleUrls: ['./editarinsumo.component.css']
})
export class EditarinsumoComponent {
  insumo: any;

  constructor(
    public dialogRef: MatDialogRef<EditarinsumoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private insumosService: InsumosService
  ) {
    // Cargar los datos del insumo a editar
    this.insumo = { ...data }; // Usamos el operador spread para copiar los datos
  }

  // Método para modificar el insumo
  modificarInsumo(): void {
    this.insumosService.modificarInsumo(this.insumo).subscribe(response => {
      console.log('Insumo modificado con éxito:', response);
      this.dialogRef.close(true); // Cerrar el diálogo y devolver un valor
    }, error => {
      console.error('Error al modificar insumo:', error);
    });
  }

  // Método para cerrar el diálogo
  onNoClick(): void {
    this.dialogRef.close();
  }
}
