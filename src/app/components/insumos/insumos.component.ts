import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { AgregarinsumosComponent } from '../dialogs/insumos/insumos.component';
import { AgregarPcComponent } from '../dialogs/agregarpc/agregarpc.component';
import { RealizarprestamodialogComponent } from '../dialogs/realizarprestamodialog/realizarprestamodialog.component';
import { GenerarpedidodialogComponent } from '../dialogs/generarpedidodialog/generarpedidodialog.component';
import { InsumosService } from '../../service/insumos/insumos.service';
import { Insumo } from '../../models/insumos/insumo';
import { EditarinsumoComponent } from '../dialogs/editarinsumo/editarinsumo.component';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InsumosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'select', 'IdInsumos', 'NombreInsumo', 'Descripcion', 'FechaAlta', 'FechaBaja',
    'Codigo', 'Cantidad', 'Marca', 'Observacion', 'IdTipoInsumo', 'IdCondicionInsumo',
    'IdEstado', 'Ubicacion_Sedes_IdSedes', 'acciones'
  ];  dataSource = new MatTableDataSource<Insumo>();
  selection = new SelectionModel<Insumo>(true, []);
  selectedEstado: number = 1; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private insumosService: InsumosService, public dialog: MatDialog) {}

  ngOnInit() {
    this.cargarInsumos(this.selectedEstado); // Llamar a la función para cargar los insumos al inicializar el componente
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarInsumos(estado: number) {
    this.insumosService.listarInsumo(estado.toString()).subscribe(
      (insumos: Insumo[]) => {
        this.dataSource.data = insumos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al cargar los insumos:', error);
      }
    );
  }

  habilitarInsumo(idInsumo: number) {
    this.insumosService.habilitarInsumo(idInsumo).subscribe(() => {
      this.cargarInsumos(this.selectedEstado);
    });
  }

  inhabilitarInsumo(idInsumo: number) {
    this.insumosService.inhabilitarInsumo(idInsumo).subscribe(() => {
      this.cargarInsumos(this.selectedEstado);
    });
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

  toggleRow(row: Insumo) {
    this.selection.toggle(row);
  }

  selectAllRows() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  selectRow(row: Insumo) {
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

  onEstadoChange(event: any): void {
    this.selectedEstado = event.value;
    this.cargarInsumos(this.selectedEstado);
  }
  openEditDialog(insumo: any): void {
    const dialogRef = this.dialog.open(EditarinsumoComponent, {
      width: '400px',
      data: insumo // Aquí pasas el insumo que deseas editar
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El insumo ha sido modificado');
        // Actualiza la lista de insumos o realiza otras acciones necesarias
      }
    });
  }
  
}
