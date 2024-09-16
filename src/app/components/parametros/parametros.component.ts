import { AfterViewInit, Component, ViewChild, ViewEncapsulation  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { ParametrosdialogComponent } from '../dialogs/parametrosdialog/parametrosdialog.component';

export interface UserData {
  id: number;
  tipoParametro: string;
  descripcion: string;
}


@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrl: './parametros.component.css'
})
export class ParametrosComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'tipoParametro', 'descripcion','acciones'];

  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(true, []); // Para habilitar selección múltiple

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    const insumos: UserData[] = [
      {
        id: 1,
        tipoParametro: 'tipoPrestario',
        descripcion: 'Docente',
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
    const dialogRef = this.dialog.open(ParametrosdialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}