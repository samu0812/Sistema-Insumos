import { AfterViewInit, Component, ViewChild, ViewEncapsulation  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarusuarioComponent } from '../dialogs/agregarusuario/agregarusuario.component';

export interface UserData {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  telefono: string;
  usuario: string;
  sede: string;
  rol: string; // Agregada la propiedad rol
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class UsuariosComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'dni', 'fechaNacimiento', 'telefono', 'usuario', 'sede', 'rol','acciones'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialog: MatDialog) {
    // Create 100 users with the relevant data fields
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  openDialog(action: string, user?: UserData): void {
    const dialogRef = this.dialog.open(AgregarusuarioComponent, {
      data: { type: action, user: user }
    });
  
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

function createNewUser(id: number): UserData {
  return {
    id: id.toString(),
    nombre: `Nombre ${id}`,
    apellido: `Apellido ${id}`,
    dni: Math.floor(10000000 + Math.random() * 90000000).toString(),
    fechaNacimiento: new Date().toISOString().split('T')[0],
    telefono: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    usuario: `usuario${id}`,
    sede: ['Formosa', 'Corrientes', 'Misiones'][Math.floor(Math.random() * 3)],
    rol: ['Admin', 'Usuario', 'Invitado'][Math.floor(Math.random() * 3)] // Agregado el rol
  };
}

