import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingService } from '../../service/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Usuario: string = '';
  Clave: string = '';
  hidePassword: boolean = true; // Controla la visibilidad de la contraseña

  constructor(private loginService: LoginService, private snackBar: MatSnackBar, private router: Router, private loadingService:LoadingService) { }

  ngOnInit() {
    console.log('LoginComponent loaded');
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onLogin() {
    this.loadingService.mostrarLoading();
    this.loginService.login(this.Usuario, this.Clave).subscribe({
      next: (response) => {
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
          duration: 3000,
        });
        console.log(response);
        this.router.navigate(['/insumos']);
        this.loadingService.ocultarLoading();
      },
      error: (error) => {
        this.loadingService.ocultarLoading();
        this.snackBar.open('Error en el inicio de sesión: ' + error.error.message, 'Cerrar', {
          duration: 3000,
        });
        console.error(error);
      }
    });
  }
}
