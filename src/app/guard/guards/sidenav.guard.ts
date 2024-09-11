import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidenavGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log('Navegando a:', state.url);

    // Si la ruta es login, permitimos el acceso retornando true
    if (state.url === '/login' || state.url === '' ) {
      console.log('Navegando a:', state.url);
      return false;
    }

    // Para las demás rutas, puedes aplicar tu lógica de sidenav o retornar true
    return true;
  }
}
