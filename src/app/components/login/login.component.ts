import { Component, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  hidePassword: boolean = true; // Controla la visibilidad de la contraseña

  constructor() { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
