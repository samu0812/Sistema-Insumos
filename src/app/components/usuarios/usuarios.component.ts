import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarpersonaComponent } from '../dialogs/agregarpersona/agregarpersona.component';
import { persona } from '../../models/usuarios/persona';
import { UsuariosService } from '../../service/usuarios/usuarios.service';
import { EditarusuarioComponent } from '../dialogs/editarusuario/editarusuario.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { AlertasService } from '../../service/alertas/alertas.service';
import { AgregarusuarioComponent } from '../dialogs/agregarusuario/agregarusuario.component';
import { Usuario } from '../../models/usuarios/usuario';
import { Router } from '@angular/router';
import { LoadingService } from '../../service/loading/loading.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'dni', 'fechaDeNacimiento', 'telefono', 'fechaAlta', 'fechaBaja', 'IdUsuario','usuario', 'rol', 'sede','FechaAltaU','FechaBajaU', 'acciones'];
  
  // Cambiamos el tipo del dataSource para aceptar tanto persona como usuario
  dataSource: MatTableDataSource<persona | Usuario> = new MatTableDataSource<persona | Usuario>([]);
  selectedEstado: number = 1; // Valor por defecto

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loading: boolean = true; 
  private loadTimeout: any; // Temporizador

  constructor(
    public dialog: MatDialog, 
    private usuariosService: UsuariosService,
    private alertasService: AlertasService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios(this.selectedEstado); 
  }

  agregarPersonaDialog(): void {
    const dialogRef = this.dialog.open(AgregarpersonaComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El usuario fue agregado:', result);
        this.cargarUsuarios(this.selectedEstado);
      }
    });
  }

  agregarUsuarioDialog(row: persona): void {
    const dialogRef = this.dialog.open(AgregarusuarioComponent, {
      width: '400px',
      data: { idPersona: row.IdPersona } // Pasamos el IdPersona al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El usuario fue agregado:', result);
        this.cargarUsuarios(this.selectedEstado); // Recargar los usuarios después de agregar uno
      }
    });
  }
  

  cargarUsuarios(estado: number): void {
    this.loadingService.mostrarLoading(); // Iniciar el loading
    
    // Ejecuta ambos servicios simultáneamente usando forkJoin
    forkJoin({
        personas: this.usuariosService.listar(estado.toString()),
        usuarios: this.usuariosService.listarUsuario(estado.toString())
    }).subscribe({
        next: ({ personas, usuarios }) => {
            // Combina los datos de personas y usuarios en un solo array
            const combinedData = personas.map((persona: { IdPersona: any; }) => {
                // Encuentra el usuario correspondiente a la persona
                const usuario = usuarios.find((u: { IdPersona: any; }) => u.IdPersona === persona.IdPersona);
                
                // Devuelve un nuevo objeto que combine ambas informaciones
                return {
                    ...persona,
                    IdUsuario: usuario ? usuario.IdUsuario : '',
                    Usuario: usuario ? usuario.Usuario : '', // Asigna el nombre del usuario si existe
                    IdSede: usuario ? usuario.IdSede : '', 
                    TipoRol_idTipoRol: usuario ? usuario.TipoRol_idTipoRol: '',
                    FechaBajaU: usuario ? usuario.FechaBaja: '',
                    FechaAltaU: usuario ? usuario.FechaAlta: '', 
                };
            });

            this.dataSource = new MatTableDataSource(combinedData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        },
        error: (error) => {
            console.error('Error al cargar usuarios y personas:', error);
            this.loadingService.ocultarLoading(); // Ocultar loading en caso de error
            this.router.navigate(['/error']); // Redirigir en caso de error
        },
        complete: () => {
            setTimeout(() => {
                this.loadingService.ocultarLoading(); // Ocultar loading cuando se complete
            }, 1000);
        }
    });
}

  onEstadoChange(event: any): void {
    this.selectedEstado = event.value;
    this.cargarUsuarios(this.selectedEstado);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialogo(type: string, row: any): void {
    const dialogRef = this.dialog.open(EditarusuarioComponent, {
      width: '700px',
      data: { 
        type: type,
        user: row
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios(this.selectedEstado);
      }
    });
  }

  inhabilitarPersona(row: persona): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '¿Inhabilitar Usuario?',
        message: `¿Estás seguro de que deseas inhabilitar al usuario ${row.Nombre} ${row.Apellido}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuariosService.inhabilitar(row.IdPersona).subscribe({
          next: (response) => {
            console.log('Persona inhabilitada:', response);
            this.alertasService.OkAlert('Ok', 'El usuario fue Eliminado');
            this.cargarUsuarios(this.selectedEstado);
          },
          error: (error) => {
            console.error('Error al inhabilitar la persona:', error);
            this.alertasService.ErrorAlert('Error', 'No se pudo Eliminar al usuario');
          }
        });
      }
    });
  }
  inhabilitar(row: persona | Usuario): void {
    // Verifica si la fila es de tipo persona o usuario
    if ('IdPersona' in row) {
      // Si es una persona, inhabilitarla
      this.inhabilitarPersona(row as persona);
    } else if ('IdUsuario' in row) {
      // Si es un usuario, inhabilitarlo
      this.inhabilitarUsuario(row as Usuario);
    }
  }
  inhabilitarUsuario(row: Usuario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
            title: '¿Inhabilitar Usuario?',
            message: `¿Estás seguro de que deseas inhabilitar al usuario ${row.Usuario}?`
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.usuariosService.inhabilitarUsuario(row.IdUsuario).subscribe({
                next: (response) => {
                    console.log('Usuario inhabilitado:', response);
                    this.alertasService.OkAlert('Ok', 'El usuario fue inhabilitado');
                    this.cargarUsuarios(this.selectedEstado);
                },
                error: (error) => {
                    console.error('Error al inhabilitar el usuario:', error);
                    this.alertasService.ErrorAlert('Error', 'No se pudo inhabilitar al usuario');
                }
            });
        }
    });
}


  habilitarPersona(row: persona): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '¿Habilitar Usuario?',
        message: `¿Estás seguro de que deseas habilitar al usuario ${row.Nombre} ${row.Apellido}?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuariosService.habilitar(row.IdPersona).subscribe({
          next: (response) => {
            this.alertasService.OkAlert('Ok', 'El usuario fue reestablecido');
            this.cargarUsuarios(this.selectedEstado);
          },
          error: (error) => {
            console.error('Error al habilitar la persona:', error);
            this.alertasService.ErrorAlert('Error', 'No se pudo Habilitar al usuario');
          }
        });
      }
    });
  }
}
