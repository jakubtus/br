import {
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {MatOption, MatSelect} from "@angular/material/select";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {SelectOptionComponent} from "./select-option/select-option.component";
import {BaseControlValueAccessor} from "../abstracts/base-control-value-accessor";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'br-select',
  standalone: true,
  imports: [
    MatSelect,
    MatOption,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent extends BaseControlValueAccessor<string> {


  @Input() placeholder?: string;

  @Output() ecChange = new EventEmitter<string>();

  @ContentChildren(SelectOptionComponent) public selectOptions!: QueryList<SelectOptionComponent>

  onChange(value: string): void {
    this.innerValue = value;

    if (this.onChangeFn) {
      this.onChangeFn(value);
    }

    this.ecChange.emit(value);
  }
}
