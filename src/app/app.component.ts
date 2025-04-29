import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from "./components/register/register.component";
import { FirepruebaComponent } from "./components/fireprueba/fireprueba.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, RegisterComponent, FirepruebaComponent],
  template: `
    <app-nav></app-nav>
    

    <router-outlet></router-outlet>


  `,
  styles: [],
})
export class AppComponent {
  title = 'AplicacionEjercicios';
}
