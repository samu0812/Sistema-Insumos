import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSidenav = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscríbete a los cambios en la navegación para detectar la URL
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Actualiza el valor de showSidenav según la ruta
      this.showSidenav = !(event.url === '/login' || event.url === '/acceso');
    });
  }
}
