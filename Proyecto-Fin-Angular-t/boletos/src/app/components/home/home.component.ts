import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  // Corrección: styleUrls (en plural)
})
export class HomeComponent {
  
  title = 'Boleteria';
  isRutaActive: boolean = false;
  isUsuarioActive: boolean = false;
  isAutobusActive: boolean = false;
  isLoginActive: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Se actualizan las variables según la ruta activa
        this.isRutaActive = this.router.url.includes('/rutas');
        this.isUsuarioActive = this.router.url.includes('/usuario');
        this.isAutobusActive = this.router.url.includes('/autobuses');  
        this.isLoginActive = this.router.url.includes('/login');
      }
    });
  }
}
