import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { AgregarusuarioComponent } from '../dialogs/agregarusuario/agregarusuario.component'; // Importa el componente del diálogo
import { persona } from '../../models/usuarios/persona';
import { UsuariosService } from '../../service/usuarios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'dni', 'fechaDeNacimiento', 'telefono', 'usuario', 'rol', 'sede', 'acciones'];
  dataSource: MatTableDataSource<persona> | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    // Código para inicializar la tabla con datos, si es necesario
  }

  // Método para abrir el diálogo de agregar usuario
  agregarUsuarioDialog(): void {
    const dialogRef = this.dialog.open(AgregarusuarioComponent, {
      width: '400px', // Ancho del diálogo (opcional)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El usuario fue agregado:', result);
        // Aquí podrías recargar la tabla o hacer cualquier otra acción necesaria
      }
    });
  }
}
