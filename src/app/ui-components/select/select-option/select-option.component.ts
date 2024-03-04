import {Component, Input} from '@angular/core';

@Component({
  selector: 'br-select-option',
  standalone: true,
  imports: [],
  template: '',
  styleUrl: './select-option.component.scss'
})
export class SelectOptionComponent {

  @Input() label!: string;

  @Input() value!: string;

}
