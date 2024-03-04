import {AbstractControl, ValidatorFn} from "@angular/forms";

const numberPattern = /^[0-9]*$/;
export const ValidateNumber: ValidatorFn = (control: AbstractControl) => {
  if (control.value != null && !numberPattern.test(control.value)) {
    return { invalidNumber: true };
  }
  return null;
}
