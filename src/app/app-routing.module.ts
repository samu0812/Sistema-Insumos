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
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'insumos', component: InsumosComponent },
  { path: 'prestamos', component: PrestamosComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'parametros', component: ParametrosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
