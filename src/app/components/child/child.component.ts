import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  template: `
    <p>
      child works!
    </p>
  <p>
    {{msg}}
  </p>
  `,
  styles: ``
})
export class ChildComponent {
  @Input() 
  msg: String = '';
  @Input()
  alumn: any;
}
