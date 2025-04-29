import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginn',
  imports: [ReactiveFormsModule],
  template: `
    <p>
      loginn works!
    </p>
   <form [formGroup]="form" (ngSubmit)="onSubmit()">
    
  `,
  styles: ``
})
export class LoginnComponent {

fb = inject(FormBuilder);

form = this.fb.nonNullable.group({
  email: ['', Validators.required],
  password: ['', Validators.required]
});

onSubmit(): void {
  console.log(`Login`);
}
}
