import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgFor, NgIf],
  template: `
    <nav class="navbar">
    <img src="icono.png" class="logo">
      <div class="navbar-content">
        <ul class="nav-links">
          <li 
            (mouseover)="setActiveMenu('home')" 
            (mouseleave)="onMouseLeavePrimary()"
          >
            <a routerLink="/home" routerLinkActive="active">Home</a>
          </li>
          <li 
            (mouseover)="setActiveMenu('about')" 
            (mouseleave)="onMouseLeavePrimary()"
          >
            <a routerLink="/about" routerLinkActive="active">Lateral</a>
          </li>
          <li 
            (mouseover)="setActiveMenu('services')" 
            (mouseleave)="onMouseLeavePrimary()"
          >
            <a routerLink="/services" routerLinkActive="active">Services</a>
          </li>
          <li 
            (mouseover)="setActiveMenu('block')" 
            (mouseleave)="onMouseLeavePrimary()"
          >
            <a routerLink="/rentas" routerLinkActive="active">Rentas</a>
          </li>
        </ul>
      </div>
    </nav>

    <nav 
      class="secondary-nav" 
      *ngIf="activeMenu" 
      (mouseover)="keepMenuOpen()" 
      (mouseleave)="clearActiveMenu()"
    >
      <ul class="secondary-links">
        <li *ngFor="let item of getSubMenuItems()">
          <a 
            (click)="navigateToSamePage()" 
            [class.selected]="selectedOption === item"
          >{{ item }}</a>
        </li>
      </ul>
    </nav>
  `,
  styles: `
    .navbar {
      display: flex;
      background-color: rgb(255, 255, 255);
      padding: 20px;
      width: 100%;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      align-items: center;
    }

    .logo {
      width: 50px;
      height: auto;
      margin-right: 10px;
      cursor: pointer; 
    }

    .navbar-content {
      display: flex;
      justify-content: center; 
      flex-grow: 1; 
    }

    .nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-links li {
      margin-right: 20px;
      position: relative;
    }

    .nav-links a {
      color: black;
      text-decoration: none;
      font-size: 1.1rem;
      padding-bottom: 5px;
      transition: all 0.3s;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: black;
      border-bottom: 2px solid black;
    }

    .secondary-nav {
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      top: 60px;
    }

    .secondary-links {
      display: flex;
      justify-content: center;
      list-style: none;
      padding: 10px;
      background-color:rgb(255, 255, 255);
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .secondary-links li {
      margin: 0 15px;
    }

    .secondary-links a {
      color: #333;
      text-decoration: none;
      font-size: 1rem;
      padding-bottom: 5px;
      transition: all 0.3s;
    }

    .secondary-links a:hover,
    .secondary-links a.selected {
      color: gray;
      cursor:pointer;
     
    }
  `
})
export class NavComponent {
  activeMenu: string | null = null;
  selectedOption: string | null = null;
  isMouseOverSecondary: boolean = false;

  subMenus: { [key: string]: string[] } = {
    home: ['Profile', 'Settings', 'Contact'],
    about: ['Team', 'History', 'Mission'],
    services: ['Consulting', 'Support', 'Training'],
    block: ['FAQ', 'Resources', 'Guides']
  };

  constructor(private router: Router) {}

  private closeTimeout: any;

  setActiveMenu(menu: string) {
    clearTimeout(this.closeTimeout);
    this.activeMenu = menu;
  }

  keepMenuOpen() {
    this.isMouseOverSecondary = true;
    clearTimeout(this.closeTimeout);
  }

  onMouseLeavePrimary() {
    this.closeTimeout = setTimeout(() => {
      if (!this.isMouseOverSecondary) {
        this.clearActiveMenu();
      }
    }, 300);
  }

  clearActiveMenu() {
    clearTimeout(this.closeTimeout);
    this.activeMenu = null;
    this.selectedOption = null;
    this.isMouseOverSecondary = false;
  }

  getSubMenuItems(): string[] {
    return this.activeMenu ? this.subMenus[this.activeMenu] : [];
  }

  navigateToSamePage() {
    if (this.activeMenu) {
      this.router.navigate([`/${this.activeMenu}`]);
      this.clearActiveMenu(); // Cierra el submenú tras navegar
    }
  }
}