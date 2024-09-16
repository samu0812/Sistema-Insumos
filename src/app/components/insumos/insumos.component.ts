import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { AgregarinsumosComponent } from '../dialogs/insumos/insumos.component';
import { AgregarPcComponent } from '../dialogs/agregarpc/agregarpc.component';
import { RealizarprestamodialogComponent } from '../dialogs/realizarprestamodialog/realizarprestamodialog.component';
import { GenerarpedidodialogComponent } from '../dialogs/generarpedidodialog/generarpedidodialog.component';

export interface InsumoData {
  nombre: string;
  codigo: string;
  descripcion: string;
  marca: string;
  observaciones: string;
  cantidad: number;
  condicion: string;
  ubicacion: string;
  estado: string;
}

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'nombre', 'codigo', 'descripcion', 'marca', 'observaciones', 'cantidad', 'condicion', 'ubicacion', 'estado', 'acciones'];
  dataSource: MatTableDataSource<InsumoData>;
  selection = new SelectionModel<InsumoData>(true, []); // Para habilitar selección múltiple

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    const insumos: InsumoData[] = [
      { nombre: 'Memoria RAM', codigo: '1234', descripcion: '8GB DDR4', marca: 'Corsair', observaciones: 'Nueva', cantidad: 10, condicion: 'Nuevo', ubicacion: 'Estante 1', estado: 'Activo' },
      { nombre: 'Memoria RAM', codigo: '1234', descripcion: '8GB DDR4', marca: 'Corsair', observaciones: 'Nueva', cantidad: 10, condicion: 'Nuevo', ubicacion: 'Estante 1', estado: 'Activo' },
      { nombre: 'Memoria RAM', codigo: '1234', descripcion: '8GB DDR4', marca: 'Corsair', observaciones: 'Nueva', cantidad: 10, condicion: 'Nuevo', ubicacion: 'Estante 1', estado: 'Activo' },
      { nombre: 'Memoria RAM', codigo: '1234', descripcion: '8GB DDR4', marca: 'Corsair', observaciones: 'Nueva', cantidad: 10, condicion: 'Nuevo', ubicacion: 'Estante 1', estado: 'Activo' },
      // Add more sample data here
    ];

    this.dataSource = new MatTableDataSource(insumos);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Filtrado de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Lógica de selección de filas
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isIndeterminate() {
    return this.selection.selected.length > 0 && !this.isAllSelected();
  }

  toggleRow(row: InsumoData) {
    this.selection.toggle(row);
  }

  selectAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  selectRow(row: InsumoData) {
    this.selection.toggle(row);
  }

  openDialog(type: string): void {
    const dialogRef = this.dialog.open(AgregarinsumosComponent, {
      data: { type }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogAgregarPc(): void {
    const dialogRef = this.dialog.open(AgregarPcComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogPrestamo(): void {
    console.log('Insumos seleccionados:', this.selection.selected); // Para depuración
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(RealizarprestamodialogComponent, {
        data: { selectedInsumos: this.selection.selected }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    } else {
      alert('No hay insumos seleccionados para realizar el préstamo');
    }
  }

  openDialogPedido(): void {
    console.log('Insumos seleccionados:', this.selection.selected); // Para depuración
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(GenerarpedidodialogComponent, {
        data: { selectedInsumos: this.selection.selected }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    } else {
      alert('No hay insumos seleccionados para realizar el préstamo');
    }
  }
  
}
