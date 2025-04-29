import { Component, inject } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fireprueba',
  imports: [CommonModule],
  template: `
<p>Datos:</p>
<ul>
  <li *ngFor="let dato of datos$ | async">
    <div>id: {{ dato.id }}</div>
    <div>Usuario: {{ dato.usuario }}</div>
    <div>Correo: {{ dato.correo }}</div>
    <div>password: {{ dato.password }}</div>
  </li>
</ul>



  `,
  styles: ``
})
export class FirepruebaComponent {
  private firestoreService = inject(FirestoreService);
  datos$: Observable<any[]> = this.firestoreService.getDatos();

}
