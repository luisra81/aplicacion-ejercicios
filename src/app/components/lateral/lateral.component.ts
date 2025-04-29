import { Component } from '@angular/core';
import { ChildComponent } from "../child/child.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lateral',
  imports: [RouterOutlet, RouterModule],
  template: `

<div class="container">
    <nav class="menu">
        <ul>
            <li><a routerLink="/child" routerLinkActive="active">Inicio</a></li>
            <li><a routerLink="/servicios" routerLinkActive="active">Servicios</a></li>
            <li><a routerLink="/productos" routerLinkActive="active">Productos</a></li>
            <li><a routerLink="/nosotros" routerLinkActive="active">Nosotros</a></li>
            <li><a routerLink="/contacto" routerLinkActive="active">Contacto</a></li>
        </ul>
    </nav>
    <div class="content">
        <router-outlet></router-outlet>
    </div>
</div>

  `,
  styles: `

body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.container {
    display: flex;
    margin-top: 15px;    
}

.menu {
    width: 250px;
    background: #ffff;
    padding-top: 20px;
    position: block;
    left: 0;
    top: 80px; /* Comienza después del menú superior */
    height: calc(100vh - 80px); /* Ajustamos la altura para que no tape el menú superior */
    z-index: 1000;
    margin: 0;
    
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        

        li {
            margin: 10px 0;

            a {
                display: block;
                margin-left: 30px;
                color: black;
                padding: 15px;
                text-decoration: none;
                font-size: 18px;
                transition: background 0.3s;
                
                &:hover, &.active {
                    background:rgb(239, 239, 239);
                }
            }
        }
    }
}

.content {
    margin-left: 270px;
    flex-grow: 1;
}

  `
})
export class LateralComponent {

}
