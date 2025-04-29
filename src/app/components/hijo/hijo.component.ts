import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICarList } from '../../interfaces y clases/carI';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Catálogo de Autos</h2>
    <div class="catalogo">
      <div class="auto-card" *ngFor="let item of carro">
        <img [src]="item.imagen" [alt]="item.name" class="auto-imagen">
        <div class="auto-info">
          <p class="auto-name">{{ item.name }}</p>
          <p class="auto-color">Color: {{ item.color }}</p>
          <p class="auto-price">Precio por hora:$ {{ item.precio }}</p>
          <p class="auto-placas">Placas: {{ item.placas }}</p>
          <p class="auto-disponible" [ngClass]="{'no-disponible': !item.disponible}">
            Disponible: {{ item.disponible ? 'Sí' : 'No' }}
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      h2 {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
        color: #333;
      }

      .catalogo {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
        padding: 20px;
        margin-top: 20px;
      }

      .auto-card {
        width: 250px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: center;
        overflow: hidden;
        transition: transform 0.3s;
        cursor: pointer;
      }

      .auto-card:hover {
        transform: translateY(-10px);
      }

      .auto-imagen {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-bottom: 1px solid #ddd;
      }

      .auto-info {
        padding: 10px;
      }

      .auto-name {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
      }

      .auto-color {
        color: #777;
        margin-bottom: 10px;
      }

      .auto-price {
        color: rgb(33, 126, 162);
        font-size: 16px;
        font-weight: bold;
      }

      .auto-placas {
        color: #555;
        margin-bottom: 10px;
      }

      .auto-disponible {
        color: #28a745; /* Verde por defecto (disponible) */
        font-weight: bold;
      }

      .no-disponible {
        color: red; /* Rojo cuando no está disponible */
      }
    `
  ]
})
export class HijoComponent {
  @Input() carro: ICarList[] = [];
}