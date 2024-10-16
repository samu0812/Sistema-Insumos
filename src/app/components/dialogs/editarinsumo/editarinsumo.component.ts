import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsumosService } from '../../../service/insumos/insumos.service';
import { AlertasService } from '../../../service/alertas/alertas.service';

@Component({
  selector: 'app-editarinsumo',
  template: `
  <h1>Editar Insumo
    <img src="../../../assets/insumos.png" class="logo">
  </h1>
  <div class="dialog-content" mat-dialog-content>
    <ng-container>
    
    <mat-form-field appearance="fill">
      <mat-label>Id Insumo</mat-label>
      <input matInput  type="number" placeholder="Id Insumo" [(ngModel)]="insumo.IdInsumos" readonly>
    </mat-form-field>
    
    <mat-form-field appearance="fill">
      <mat-label>Nombre del Insumo</mat-label>
      <input matInput placeholder="Nombre" [(ngModel)]="insumo.NombreInsumo">
    </mat-form-field>
    
    <mat-form-field appearance="fill">
      <mat-label>Código</mat-label>
      <input matInput placeholder="Código" [(ngModel)]="insumo.Codigo">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Descripción</mat-label>
      <input matInput placeholder="Descripción" [(ngModel)]="insumo.Descripcion">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Marca</mat-label>
      <input matInput placeholder="Marca" [(ngModel)]="insumo.Marca">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Observaciones</mat-label>
      <input matInput placeholder="Observaciones" [(ngModel)]="insumo.Observacion">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Cantidad</mat-label>
      <input matInput type="number" placeholder="Cantidad" [(ngModel)]="insumo.Cantidad">
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Tipo de Insumo</mat-label>
      <mat-select [(ngModel)]="insumo.IdTipoInsumo">
      <mat-option *ngFor="let tipoInsumo of ltTipoInsumo" [value]="tipoInsumo.IdTipoInsumo">{{ tipoInsumo.Descripcion }}</mat-option>
    </mat-select>
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Condición</mat-label>
      <mat-select [(ngModel)]="insumo.IdCondicionInsumo">
            <mat-option *ngFor="let condicionInsumo of ltCondicionInsumo" [value]="condicionInsumo.IdCondicionInsumo">{{ condicionInsumo.Descripcion }}</mat-option>
          </mat-select>
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Estado</mat-label>
      <mat-select [(ngModel)]="insumo.IdEstado">
    <mat-option *ngFor="let estado of ltEstado" [value]="estado.IdEstado">{{ estado.Descripcion }}</mat-option>
    </mat-select>
    </mat-form-field>
  
    <mat-form-field appearance="fill">
      <mat-label>Ubicación</mat-label>
      <mat-select [(ngModel)]="insumo.Ubicacion_Sedes_IdSedes">
        <mat-option [value]="1">Sala 1</mat-option>
        <mat-option [value]="2">Sala 2</mat-option>
        <mat-option [value]="3">Sala 3</mat-option>
      </mat-select>
    </mat-form-field>
    </ng-container>
  </div>

  <div mat-dialog-actions class="grupoBtn" align="end">
    <button mat-fab extended (click)="onNoClick()" class="cancelarBtn">Cancelar</button>
    <button mat-fab extended (click)="modificarInsumo()" class="aceptarBtn">Aceptar</button>
  </div>
  `,
  styleUrls: ['./editarinsumo.component.css']
})
export class EditarinsumoComponent {
  insumo: any;
  ltCondicionInsumo: any[] = [];
  ltEstado: any[] = [];
  ltTipoInsumo: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditarinsumoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private insumosService: InsumosService,
    private alertasService: AlertasService
  ) {
    // Cargar los datos del insumo a editar
    this.insumo = { ...data }; // Usamos el operador spread para copiar los datos
  }

  ngOnInit(): void {
    // Cargar las sedes desde el servicio con filtro '1'
    this.insumosService.listarCondicionInsumo('1').subscribe({
      next: (response) => {
        this.ltCondicionInsumo = response || []; // Asignar las sedes directamente
        console.log('Sedes recibidas:', response); // Mostrar las sedes en consola
      },
      error: (error) => {
        this.alertasService.mostrarAlerta('500', 'Error', 'Error al cargar las sedes');
      }
    });
    this.insumosService.listarEstado('1').subscribe({
      next: (response) => {
        this.ltEstado = response || []; // Asignar las sedes directamente
        console.log('Sedes recibidas:', response); // Mostrar las sedes en consola
      },
      error: (error) => {
        this.alertasService.mostrarAlerta('500', 'Error', 'Error al cargar las sedes');
      }
    });
    this.insumosService.listarTipoInsumo('1').subscribe({
      next: (response) => {
        this.ltTipoInsumo = response || []; // Asignar las sedes directamente
        console.log('Sedes recibidas:', response); // Mostrar las sedes en consola
      },
      error: (error) => {
        this.alertasService.mostrarAlerta('500', 'Error', 'Error al cargar las sedes');
      }
    });
  }

  // Método para modificar el insumo
  modificarInsumo(): void {
    // Crear una copia del insumo, renombrando IdInsumos a IdInsumo
    const insumoModificado = {
      ...this.insumo,
      IdInsumo: this.insumo.IdInsumos, // Renombrar IdInsumos a IdInsumo
    };
  
    // Eliminar la propiedad original IdInsumos para evitar duplicados
    delete insumoModificado.IdInsumos;
  
    console.log('Datos enviados para modificar:', insumoModificado); 
  
    this.insumosService.modificarInsumo(insumoModificado).subscribe({
      next: (response) => {
        const mensaje = response.body.message;
        const status = response.body.status;
  
        // Mostrar alerta según el estado recibido
        this.alertasService.mostrarAlerta(status.toString(), 'Ok', mensaje);
        this.dialogRef.close(response.body);  // Cierra el diálogo con la respuesta
      },
      error: (error) => {
        const status = error.status || 500;
        const mensaje = error.error?.message || 'Error al modificar el insumo';
        this.alertasService.mostrarAlerta(status.toString(), 'Error', mensaje);
      }
    });
  }
  
  

  // Método para cerrar el diálogo
  onNoClick(): void {
    this.dialogRef.close();
  }
}
