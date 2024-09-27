import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  @Input() errorTitle: string = 'Error 404';
  @Input() errorMessage: string = 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.';
  @Input() errorImage: string = 'assets/images/error.gif';  // Ruta de la imagen de error
}
