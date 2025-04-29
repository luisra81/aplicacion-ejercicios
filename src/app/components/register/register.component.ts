import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
<!DOCTYPE html>
<html lang="es">
    <header>
        <title>Te damos la Bienvenida a Nike: Registrate</title>
        <link rel="Icono.png">
    </header>
    <body>
        <main>
        <div class="imagenes">
        <img src="icono.png" class="menu-icono" width="90" height="60">
        </div>
        <div class="parrafo2">
            <p>México</p>
        </div>
        <!--Formulario-->
  <form [formGroup]="form">
    <div class="parrafo">
      <p>Ingresa tus datos para Unirte.</p>
    </div>

    <div class="registro">
        <input id="email" type="email" placeholder="Correo electrónico*" formControlName="email" [class.invalid]="form.get('email')?.invalid && form.get('email')?.touched" />
        <div *ngIf="form.get('email')?.invalid && form.get('email')?.touched" class="error">Correo electrónico inválido</div>

        <input id="nombre" type="text" placeholder="Nombre*" formControlName="nombre" [class.invalid]="form.get('nombre')?.invalid && form.get('nombre')?.touched" />
        <div *ngIf="form.get('nombre')?.invalid && form.get('nombre')?.touched" class="error">Nombre inválido</div>

        <input id="telefono" type="number" placeholder="Número de teléfono*" formControlName="telefono" [class.invalid]="form.get('telefono')?.invalid && form.get('telefono')?.touched" />
        <div *ngIf="form.get('telefono')?.invalid && form.get('telefono')?.touched" class="error">Número de teléfono inválido (10 dígitos)</div>

        <input id="contacto" type="text" placeholder="Contacto*" formControlName="contacto" [class.invalid]="form.get('contacto')?.invalid && form.get('contacto')?.touched" />
        <div *ngIf="form.get('contacto')?.invalid && form.get('contacto')?.touched" class="error">Contacto inválido</div>
      </div>
  </form>
  <div>
    <a href="#" class="boton1" (click)="validateForm()">Registrar</a>
  </div>
        <div class="jason">
            <h5>Valores</h5>
            <pre>{{form.value | json}}</pre>          
        </div>
        </main>
    </body>
</html>
  `,
  styles: `

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
    background-color: #f4f4f4;
    text-align: center;
    padding: 20px;
}
.error {
    color: red;
    font-size: 0.9rem;
    margin-top: 5px;
  }
  .invalid {
    border: 2px solid red !important;
  }

.container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

.imagenes img {
    width: 80px;
    height: auto;
}

.parrafo {
    font-size: 1.5rem;
    margin: 10px 0;
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
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.boton1 {
  display: block;
    width: 190px;
    margin-left: 39.5%;
    padding: 12px;
    font-size: 1rem;
    background: black;
    color: white;
    border: none;
    border-radius: 18px;
    margin-top: 15px;
    cursor: pointer;
    transition: background 0.3s;
}

.boton1:hover {
    background: gray;
}
.jason{
    background-color: #dae9fe;
    width: 35%;
    margin-top: 50px;
    border-radius: 15px;
    margin-left: 33%;
  
}
.jason h2{
    text-align: center;
    color: #2c3e50;
    font-family: Arial, sans-serif;
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
@media (max-width: 600px) {
    .container {
        width: 90%;
    }
    .boton1 {
          margin-left: 23.5%;
      }
      .jason{
        background-color: #dae9fe;
        width: 85%;
        margin-top: 50px;
        border-radius: 15px;
        margin-left: 8%;
    }
}
@media(min-width: 768px){
    main{
        background-color: white;
        border-radius: 10px;
        height: 65%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .registro input {
        width: 60%;
        padding: 10px;
        font-size: 1.1rem;
        margin-top: 10px;
}
}
`
})
export class RegisterComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nombre: new FormControl('', [Validators.required,Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]),
    telefono: new FormControl('', [Validators.required,Validators.pattern(/^\d{10}$/), ]),// 10 dígitos
    contacto: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]),
  });
  
  validateForm() {
    if (this.form.invalid) {
      this.markAllAsTouched();
      alert('Por favor, complete el formulario correctamente.');
    } else {
      alert('Formulario válido');
    }
  }
 // Marca todos los controles como tocados
  markAllAsTouched() {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}