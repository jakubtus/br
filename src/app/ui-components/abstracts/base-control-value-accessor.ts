import {ControlValueAccessor} from "@angular/forms";

export abstract class BaseControlValueAccessor<T> implements ControlValueAccessor {

  onChangeFn!: (value: T) => void;
  onTouchedFn!: () => void;
  protected innerValue!: T;

  get value(): T {
    return this.innerValue;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn  = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: T): void {
    this.innerValue = obj;
  }

}
