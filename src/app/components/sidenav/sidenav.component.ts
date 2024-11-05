import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { CambiarclaveComponent } from '../dialogs/cambiarclave/cambiarclave.component';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  @ViewChild(MatSidenav, {static: true})
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver,public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.observer.observe(["(max-width: 800px)"])
    .subscribe((res) => {
      if(res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();  // Sidenav se cierra en pantallas pequeñas
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();   // Sidenav se abre en pantallas grandes
      }
    });
  }
  openCambiarClave(): void {
    const dialogRef = this.dialog.open(CambiarclaveComponent, {
      width: '400px'
    });
  
}
}