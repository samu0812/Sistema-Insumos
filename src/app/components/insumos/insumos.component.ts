import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarinsumosComponent } from '../dialogs/insumos/insumos.component';
import { AgregarPcComponent } from '../dialogs/agregarpc/agregarpc.component';

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
  displayedColumns: string[] = ['nombre', 'codigo', 'descripcion', 'marca', 'observaciones', 'cantidad', 'condicion', 'ubicacion', 'estado', 'acciones'];
  dataSource: MatTableDataSource<InsumoData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialog: MatDialog) {
    const insumos: InsumoData[] = [
      { nombre: 'Memoria RAM', codigo: '1234', descripcion: '8GB DDR4', marca: 'Corsair', observaciones: 'Nueva', cantidad: 10, condicion: 'Nuevo', ubicacion: 'Estante 1', estado: 'Activo' },
      // Add more sample data here
    ];

    this.dataSource = new MatTableDataSource(insumos);
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
