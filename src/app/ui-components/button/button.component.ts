import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'br-button',
  standalone: true,
  imports: [
    MatButton,
    NgTemplateOutlet
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() disabled = false;

  @Input() color: 'primary' | 'warn' |  'accent' = 'primary';

  @Input() type: 'flat' | 'basic' = 'flat';

  @Output() ecClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.ecClick.emit(event);
    }
  }
}
