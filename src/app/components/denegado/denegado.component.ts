import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-denegado',
  templateUrl: './denegado.component.html',
  styleUrl: './denegado.component.css'
})
export class DenegadoComponent {
  @Input() errorTitle: string = 'Acceso Denegado';
  @Input() errorMessage: string = 'Usted no posee Permisos.';
  @Input() errorImage: string = 'assets/images/error.gif';  // Ruta de la imagen de error
}
