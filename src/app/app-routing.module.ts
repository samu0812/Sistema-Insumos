import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SidenavGuard } from './guard/guards/sidenav.guard';
import { InsumosComponent } from './components/insumos/insumos.component';
import { PrestamosComponent } from './components/prestamos/prestamos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ParametrosComponent } from './components/parametros/parametros.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';
import { DenegadoComponent } from './components/denegado/denegado.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'loading', component: LoadingComponent },
  { path: 'denegado', component: DenegadoComponent }, 
  { path: 'error', component: ErrorComponent }, // Ruta sin sidenav
  {
    path: '', // Rutas con sidenav
    component: LayoutComponent,
    children: [
      { path: 'insumos', component: InsumosComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'prestamos', component: PrestamosComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'parametros', component: ParametrosComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: '', redirectTo: '/insumos', pathMatch: 'full' }, // Redireccionar a insumos por defecto
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
