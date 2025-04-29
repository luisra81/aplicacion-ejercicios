import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { LateralComponent } from './components/lateral/lateral.component';
import { ChildComponent } from './components/child/child.component';
import { literal } from '@angular/compiler';
import { RentasComponent } from './components/rentas/rentas.component';
import { ParentComponent } from './components/parent/parent.component';
import { PadreComponent } from './components/padre/padre.component';
import { FirepruebaComponent } from './components/fireprueba/fireprueba.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [  
    {path: "nav", component: NavComponent},
    {path: "home", component: RegisterComponent},
    {path: "about", component: LateralComponent},
    {path: "services", component: ServicesComponent},
    {path: "blog", component: BlogComponent},
    {path: '', component: LateralComponent, children: [
        { path: 'child', component: ChildComponent },
    
      ]},
    {path: "fire", component: FirepruebaComponent},
    {path: "rentas", component: RentasComponent},
    {path: "parent", component: ParentComponent},
    {path: "padre", component: PadreComponent},
    {path: "**", component: ErrorComponent},
];

