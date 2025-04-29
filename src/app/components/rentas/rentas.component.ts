import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ICarList } from '../../interfaces y clases/carI';

@Component({
  selector: 'app-rentas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="container">
      <h1 class="title">Número de rentas: {{ numberTask }}</h1>
      <span class="subtitle">Título de rentas: {{ tittleTask }}</span>
      
      <div class="registro">
        <input type="text" placeholder="Ingrese el nombre del chofer" [(ngModel)]="nuevoChofer" (input)="validarFormulario()">
        <span class="error" *ngIf="nuevoChofer && !validarNombre(nuevoChofer)">El nombre solo puede contener letras y espacios.</span>
        
        <select [(ngModel)]="nuevaPlaca" (change)="onPlacaSelected()">
          <option value="" disabled selected>Seleccione las placas del auto</option>
          <option *ngFor="let auto of autosDisponibles" [value]="auto.placas">{{ auto.placas }}</option>
        </select>

        <!-- Mostrar información del auto seleccionado -->
        <div *ngIf="autoSeleccionado">
          <p><strong>Modelo:</strong> {{ autoSeleccionado.name }}</p>
          <p><strong>Color:</strong> {{ autoSeleccionado.color }}</p>
          <p><strong>Precio:</strong> {{ autoSeleccionado.precio }}</p>
          <img [src]="autoSeleccionado.imagen" alt="Imagen del auto" class="modelo-imagen">
        </div>
        
        <button (click)="agregarRenta()" [disabled]="activeButton">Agregar</button>
      </div>
      
      <ul>
        <li *ngFor="let renta of rentas" (click)="desplegar(renta)">
          <div class="user">
            {{ renta.usuario }}
          </div>
          <div *ngIf="renta.mostrarInfo" class="info">
            <p><strong>Chofer:</strong> {{ renta.chofer }}</p>
            <p><strong>Marca del auto:</strong> {{ renta.marca }}</p>
            <p><strong>Placas:</strong> {{ renta.placas }}</p>
            <img [src]="renta.imagen" alt="Imagen del auto rentado" class="modelo-imagen">
          </div>
        </li>
      </ul>
      
      <button (click)="rentarAuto()" [disabled]="!selectedRenta">Rentar</button>
      
      <div class="jason">
        <h5>Valores</h5>
        <pre *ngIf="selectedRenta; else noSeleccion">
          {{ selectedRenta | json }}
        </pre>
        <ng-template #noSeleccion>
          <p>Seleccione una renta para ver los detalles</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      select {
        width: 100%;
        padding: 10px;
        font-size: 1rem;
        margin-top: 10px;
        border: 2px solid #ccc;
        border-radius: 10px;
        outline: none;
      }
      .modelo-imagen {
        width: 100px;
        height: auto;
        display: block;
        margin: 10px auto;
      }
      .container {
        text-align: center;
        max-width: 500px;
        margin: auto;
        padding: 20px;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .subtitle {
        font-size: 18px;
        color: #555;
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
      ul {
        list-style: none;
        padding: 0;
        margin: auto;
      }
      li {
        background: #f9f9f9;
        margin: 8px 0;
        padding: 10px;
        border-radius: 8px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: background 0.3s;
      }
      li:hover {
        background: #eaeaea;
      }
      .user {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
      }
      .info {
        margin-top: 5px;
        padding: 8px;
        background: #fff;
        border-radius: 6px;
        box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);
      }
      p {
        margin: 5px 0;
      }
      button {
        display: block;
        margin: 20px auto;
        padding: 10px 20px;
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
      .jason {
        background-color: #dae9fe;
        width: 100%;
        margin-top: 50px;
        border-radius: 15px;
      }
      .jason pre {
        padding: 10px;
        font-family: monospace;
        font-size: 13px;
        color: #444;
        background: #fff;
        border-radius: 5px;
        border: 1px solid #ddd;
        text-align: left;
        overflow-x: auto;
      }
    `
  ]
})
export class RentasComponent {
  @Input() catalogoAutos: ICarList[] = [];
  @Output() estadoCambiado = new EventEmitter<ICarList>();

  numberTask: number = 0;
  tittleTask: string = "Tarea 1";
  nuevoChofer: string = "";
  nuevaPlaca: string = "";
  autoSeleccionado: ICarList | null = null;

  activeButton: boolean = true;
  rentas: { usuario: string; chofer: string; marca: string; placas: string; imagen: string; mostrarInfo: boolean; }[] = [];
  selectedRenta: any = null;

  // Propiedad calculada para autos disponibles
  get autosDisponibles(): ICarList[] {
    return this.catalogoAutos.filter(auto => auto.disponible);
  }

  // Método para manejar la selección de placa
  onPlacaSelected() {
    this.autoSeleccionado = this.catalogoAutos.find(auto => auto.placas === this.nuevaPlaca) || null;
    this.validarFormulario();
  }

  // Validar el nombre del chofer
  validarNombre(nombre: string): boolean {
    return /^[a-zA-Z\s]+$/.test(nombre);
  }

  // Validar el formulario
  validarFormulario() {
    this.activeButton = !(this.nuevoChofer.trim() && this.validarNombre(this.nuevoChofer) && this.nuevaPlaca.trim());
  }

  // Agregar una nueva renta
  agregarRenta() {
    if (!this.activeButton && this.autoSeleccionado) {
      this.rentas.push({
        usuario: this.nuevoChofer,
        chofer: this.nuevoChofer,
        marca: this.autoSeleccionado.name,
        placas: this.nuevaPlaca,
        imagen: this.autoSeleccionado.imagen,
        mostrarInfo: false
      });
      this.numberTask++;
      // Emitir el auto completo con el estado actualizado
      const autoActualizado = { ...this.autoSeleccionado, disponible: false };
      this.estadoCambiado.emit(autoActualizado);
      // Reiniciar formulario
      this.nuevoChofer = "";
      this.nuevaPlaca = "";
      this.autoSeleccionado = null;
      this.validarFormulario();
    }
  }

  // Mostrar/ocultar información de la renta
  desplegar(renta: any) {
    this.rentas.forEach(r => { if (r !== renta) r.mostrarInfo = false; });
    renta.mostrarInfo = !renta.mostrarInfo;
    this.selectedRenta = renta.mostrarInfo ? renta : null;
  }

  // Rentar el auto seleccionado
  rentarAuto() {
    if (this.numberTask === 0) {
      alert("No hay Rentas Disponibles");
    } else {
      alert(`Has rentado el auto de ${this.selectedRenta.usuario}`);
      this.numberTask++;
      // Buscar el auto correspondiente en el catálogo
      const auto = this.catalogoAutos.find(a => a.placas === this.selectedRenta.placas);
      if (auto) {
        // Emitir el auto completo con el estado actualizado
        const autoActualizado = { ...auto, disponible: true };
        this.estadoCambiado.emit(autoActualizado);
      }
      // Eliminar la renta de la lista
      this.rentas = this.rentas.filter(renta => renta !== this.selectedRenta);
      this.selectedRenta = null;
    }
  }
}