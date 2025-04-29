import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HijoComponent } from "../hijo/hijo.component";
import { RentasComponent } from "../rentas/rentas.component";
import { ICarList } from '../../interfaces y clases/carI';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [CommonModule, FormsModule, HijoComponent, RentasComponent],
  template: `
    <div class="container">
      <h1 class="title">Padre</h1>

      <!-- Botón para mostrar/ocultar el formulario -->
      <button (click)="esconderFormulario()" class="toggle-button">
        {{ mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario' }}
      </button>

      <!-- Formulario -->
      <div *ngIf="mostrarFormulario" class="registro">
        <h2>Agregar un nuevo coche</h2>
        <input type="text" placeholder="Nombre del coche" [(ngModel)]="nuevoCoche.name" (input)="validarFormulario()">
        <span class="error" *ngIf="nuevoCoche.name && !validarTexto(nuevoCoche.name)">El nombre solo puede contener letras y espacios.</span>

        <input type="text" placeholder="Color" [(ngModel)]="nuevoCoche.color" (input)="validarFormulario()">
        <span class="error" *ngIf="nuevoCoche.color && !validarTexto(nuevoCoche.color)">El color solo puede contener letras.</span>
        
        <input type="number" placeholder="Precio" [(ngModel)]="nuevoCoche.precio" (input)="validarFormulario()">
        <span class="error" *ngIf="nuevoCoche.precio && nuevoCoche.precio <= 0">El precio debe ser mayor a 0.</span>

        <input type="file" (change)="onFileSelected($event)" accept="image/*">
        <div *ngIf="nuevoCoche.imagen">
          <img [src]="nuevoCoche.imagen" alt="Vista previa" class="modelo-imagen">
        </div>


        <input type="text" placeholder="Placas del auto" [(ngModel)]="nuevoCoche.placas" (input)="validarFormulario()">
        <span class="error" *ngIf="nuevoCoche.placas && !validarPlacas(nuevoCoche.placas)">Las placas deben tener 6 caracteres alfanuméricos.</span>
        <span class="error" *ngIf="nuevoCoche.placas && placaExiste(nuevoCoche.placas)">La placa ya existe dentro del catálogo</span>
        <button (click)="agregarCoche()" [disabled]="!formularioValido">Agregar</button>
      </div>

      <div class="catalogo">
        <app-hijo [carro]="productos"></app-hijo>
      </div>

      <!-- Sección de Rentas -->
      <app-rentas [catalogoAutos]="productos" (estadoCambiado)="actualizarEstado($event)"></app-rentas>
    </div>
  `,
  styles: [
    `
      .container {
        text-align: center;
        max-width: 800px;
        margin: auto;
        padding: 20px;
      }

      .title {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .toggle-button {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 20px;
      }

      .toggle-button:hover {
        background-color: #0056b3;
      }

      .registro {
        background: #f9f9f9;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        transition: all 0.3s ease-in-out;
      }

      .registro h2 {
        margin-bottom: 15px;
      }

      .registro input {
        width: 100%;
        padding: 10px;
        font-size: 1rem;
        margin-top: 10px;
        border: 2px solid #ccc;
        border-radius: 10px;
        outline: none;
      }

      .registro input:focus {
        border-color: rgb(33, 126, 162);
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
      }

      .error {
        color: red;
        font-size: 14px;
      }

      .modelo-imagen {
        width: 120px;
        height: auto;
        display: block;
        margin: 10px auto;
      }

      button {
        display: block;
        margin: 20px auto;
        padding: 12px 24px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: rgb(20, 176, 119);
        color: white;
      }

      button:disabled {
        background-color: gray;
        cursor: not-allowed;
      }

      .catalogo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }

      .modelo-imagen {
        width: 120px;
        height: auto;
        display: block;
        margin: 10px auto;
        border-radius: 10px;
        border: 2px solid #ccc;
      }

    `
  ]
})
export class PadreComponent {
  public productos: ICarList[] = [
    { id: 1, name: 'Honda', color: 'Gris', precio: 300, imagen: 'honda-civic.png', disponible: true, placas: 'ABC123' },
    { id: 2, name: 'Ford', color: 'Rojo', precio: 400, imagen: 'ford-focus.jpg', disponible: true, placas: 'DEF456' },
    { id: 3, name: 'Toyota', color: 'Gris', precio: 500, imagen: 'toyota-corolla.jpg', disponible: true, placas: 'GHI789' }
  ];

  nuevoCoche: ICarList = { id: 0, name: '', color: '', precio: 1, imagen: '', disponible: true, placas: '' };
  formularioValido = false;
  mostrarFormulario = false;

  esconderFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  validarTexto(texto: string): boolean {
    return /^[a-zA-Z\s]+$/.test(texto);
  }

  validarPlacas(placas: string): boolean {
    return /^[A-Za-z0-9]{6}$/.test(placas);
  }

  validarFormulario() {
    this.formularioValido = this.validarTexto(this.nuevoCoche.name) &&
                            this.validarTexto(this.nuevoCoche.color) &&
                            this.nuevoCoche.precio > 0 &&
                            this.nuevoCoche.imagen.trim() !== '' &&
                            this.validarPlacas(this.nuevoCoche.placas) &&
                            !this.placaExiste(this.nuevoCoche.placas); 
  }

  placaExiste(placas: string): boolean {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].placas === placas) {
        return true;
      }
    }
    return false;
  }
  

  agregarCoche() {
    if (this.placaExiste(this.nuevoCoche.placas)) {
      alert('Error: Las placas ya están registradas.');
      return;
    }else{
      if (this.formularioValido) {
        this.nuevoCoche.id = this.productos.length + 1;
        this.productos.push({ ...this.nuevoCoche });
        this.nuevoCoche = { id: 0, name: '', color: '', precio: 0, imagen: '', disponible: true, placas: '' };
        this.validarFormulario();
        this.mostrarFormulario = false;
      }
    }


  }

  // Método para manejar el evento emitido por RentasComponent
  actualizarEstado(autoActualizado: ICarList) {
    const index = this.productos.findIndex(auto => auto.placas === autoActualizado.placas);
    if (index !== -1) {
      this.productos[index] = { ...autoActualizado };
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.nuevoCoche.imagen = reader.result as string;
        this.validarFormulario();
      };
      reader.readAsDataURL(file);
    }
  }
  
}