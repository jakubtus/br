import {Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BaseControlValueAccessor} from "../abstracts/base-control-value-accessor";

@Component({
  selector: 'br-text-field',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
})
export class TextFieldComponent extends BaseControlValueAccessor<string> {

  @Input() type: 'text' | 'password' = 'text';

  @Input()  placeholder?: string;

  @Output() ecChange = new EventEmitter<string>();

  override innerValue = '';

  onChange(event: Event): void  {
    const value = (event.target as HTMLInputElement).value;
    this.innerValue = value;
    this.ecChange.emit(value);
    if (this.onChangeFn) {
      this.onChangeFn(value);
    }
  }
}
