import { Component } from '@angular/core';
import { ChildComponent } from "../child/child.component";

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  template: `
  
  <h1>Comunicacion padre-hijo utilizando input</h1>
  <app-child [msg]="text"></app-child>
  `,
  styles: ``
})
export class ParentComponent {
  text: String = "Variable desde el padre";
  alumn: any = {
    name: "Edgar",
    age: 30,
    email: "edgar@gmail.com",
    imagen: "icono.png"
  }
}
