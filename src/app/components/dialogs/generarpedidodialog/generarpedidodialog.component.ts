import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generarpedidodialog',
  template: `
  <ng-container class="contenedorDialog">
  <h1>Realizar Pedido
  <img src="../../../assets/pedidos.png" class="logo">
  </h1>
  <div mat-dialog-content>
    <mat-tab-group>
      
      <mat-tab label="Insumos">
        <div class="table-container">
              <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
                <ng-container matColumnDef="nombre">
                  <th mat-header-cell *matHeaderCellDef> Nombre del Insumo </th>
                  <td mat-cell *matCellDef="let element"> {{element.nombre}} </td>
                </ng-container>
                <ng-container matColumnDef="codigo">
                    <th mat-header-cell *matHeaderCellDef> Código </th>
                    <td mat-cell *matCellDef="let element"> {{element.codigo}} </td>
                </ng-container>
                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>
            </div>
      </mat-tab>
      
      <mat-tab label="Agregar">
      <div class="bodyDialog">
      <mat-form-field appearance="fill">
        <mat-label>Agregar</mat-label>
        <textarea matInput></textarea>
        </mat-form-field>
      </div>
      </mat-tab>


    </mat-tab-group>
  </div>
  <div mat-dialog-actions class="grupoBtn" align="end">
    <button mat-fab extended (click)="onCancelClick()" class="cancelarBtn">Cancelar</button>
    <button mat-fab extended mat-dialog-close class="aceptarBtn">Aceptar</button>
  </div>
  </ng-container>
  `,
  styleUrl: './generarpedidodialog.component.css'
})
export class GenerarpedidodialogComponent {
  displayedColumns: string[] = ['nombre', 'codigo'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<GenerarpedidodialogComponent>
  ) {
    console.log('Datos recibidos en el diálogo:', data.selectedInsumos);
    this.dataSource.data = data.selectedInsumos || [];
  }

  onCancelClick(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }
}