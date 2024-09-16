import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { AgregarinsumosComponent } from '../dialogs/insumos/insumos.component';
import { AgregarPcComponent } from '../dialogs/agregarpc/agregarpc.component';
import { PrestamosdialogComponent } from '../dialogs/prestamosdialog/prestamosdialog.component';

export interface InsumoData {
  idInsumos: number;
  idPrestamos: number;
  fechaInicio: string;
  fechaVencimiento: string;
  fechaDevolucion: string;
  nombre: string;
  apellido: string;
  dni: string;
  firma: string;
  lugar: string;
  idUsuario: number;
  nombreUsuario: string;
  idTipoPrestario: number;
  descripcion: string;
  idEstado: number; // Nueva propiedad
  estado: string;   // Nueva propiedad
  idCondicion: number; // Nueva propiedad
  condicion: string;   // Nueva propiedad
}



@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})

export class PrestamosComponent implements AfterViewInit {
  displayedColumns: string[] = ['idInsumos', 'idPrestamos', 'fechaInicio', 'fechaVencimiento', 'fechaDevolucion', 'nombre', 'apellido', 'dni', 'firma', 'lugar', 'nombreUsuario', 'descripcion', 'idEstado', 'estado', 'idCondicion', 'condicion','acciones'];

  dataSource: MatTableDataSource<InsumoData>;
  selection = new SelectionModel<InsumoData>(true, []); // Para habilitar selección múltiple

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    const insumos: InsumoData[] = [
      {
        idInsumos: 1,
        idPrestamos: 101,
        fechaInicio: '2023-09-01',
        fechaVencimiento: '2023-09-15',
        fechaDevolucion: '',
        nombre: 'Juan',
        apellido: 'Pérez',
        dni: '12345678',
        firma: 'JuanP',
        lugar: 'Sala A',
        idUsuario: 1,
        nombreUsuario: 'jperez',
        idTipoPrestario: 1,
        descripcion: 'Préstamo de equipo',
        idEstado: 1,
        estado: 'Activo',
        idCondicion: 2,
        condicion: 'Bueno'
      }
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



  openDialog(): void {
    const dialogRef = this.dialog.open(PrestamosdialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}