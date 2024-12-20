import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideHttpClient } from '@angular/common/http';

//componentes
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginComponent } from './components/login/login.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ParametrosComponent } from './components/parametros/parametros.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';

//dialogs
import { AgregarinsumosComponent } from './components/dialogs/insumos/insumos.component';
import { AgregarPcComponent } from './components/dialogs/agregarpc/agregarpc.component';
import { AgregarpersonaComponent } from './components/dialogs/agregarpersona/agregarpersona.component';
import { PrestamosdialogComponent } from './components/dialogs/prestamosdialog/prestamosdialog.component';
import { ParametrosdialogComponent } from './components/dialogs/parametrosdialog/parametrosdialog.component';
import { RealizarprestamodialogComponent } from './components/dialogs/realizarprestamodialog/realizarprestamodialog.component';
import { GenerarpedidodialogComponent } from './components/dialogs/generarpedidodialog/generarpedidodialog.component';
import { EditarusuarioComponent } from './components/dialogs/editarusuario/editarusuario.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { DenegadoComponent } from './components/denegado/denegado.component';
import { AgregarusuarioComponent } from './components/dialogs/agregarusuario/agregarusuario.component';
import { EditarinsumoComponent } from './components/dialogs/editarinsumo/editarinsumo.component';
import { CambiarclaveComponent } from './components/dialogs/cambiarclave/cambiarclave.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    SidenavComponent,
    AgregarinsumosComponent,
    InsumosComponent,
    AgregarPcComponent,
    AgregarpersonaComponent,
    PrestamosComponent,
    PedidosComponent,
    ReportesComponent,
    ParametrosComponent,
    PrestamosdialogComponent,
    ParametrosdialogComponent,
    RealizarprestamodialogComponent,
    GenerarpedidodialogComponent,
    EditarusuarioComponent,
    ConfirmDialogComponent,
    LayoutComponent,
    LoadingComponent,
    ErrorComponent,
    DenegadoComponent,
    AgregarusuarioComponent,
    EditarinsumoComponent,
    CambiarclaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    LayoutModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule, 
    MatDividerModule,
    MatTabsModule,
    MatSelectModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
    BrowserAnimationsModule, // Necesario para Angular Material
    MatDialogModule,
    MatFormFieldModule, // Asegúrate de tener este módulo
    MatInputModule, // Asegúrate de tener este módulo
    MatButtonModule, // Si estás utilizando botones de Angular Material
    ReactiveFormsModule

  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
