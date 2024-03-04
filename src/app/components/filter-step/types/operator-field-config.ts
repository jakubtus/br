import {Operator} from "../enums/operator.enum";
import {ValidatorFn, Validators} from "@angular/forms";
import {ValidateNumber} from "../../../shared/validators/validate-number";

export const operatorFieldConfig =  new Map<Operator, FieldConfig[]>([
  [
    Operator.contains,
    [{
      defaultValue: '',
      placeholder: 'Select a value',
    }],
  ],
  [
    Operator.equals,
    [{
      defaultValue: '',
      validators: [Validators.required]
    }]
  ],
  [
    Operator.does_not_contain,
    [{
      defaultValue: '',
      validators: [Validators.required]
    }]
  ],
  [
    Operator.does_not_equal,
    [{
      defaultValue: '',
      validators: [Validators.required]
    }]
  ],
  [
    Operator.less_than,
    [{
      defaultValue: '0',
      validators: [Validators.required, ValidateNumber]
    }]
  ],
  [
    Operator.equal_to,
    [{
      defaultValue: '0',
      validators: [Validators.required, ValidateNumber]
    }]
  ],
  [
    Operator.greater_than,
    [{
      defaultValue: '0',
      validators: [Validators.required, ValidateNumber]
    }]
  ],
  [
    Operator.in_between,
    [
      {
        defaultValue: '0',
        validators: [Validators.required, ValidateNumber]
      },
      {
        defaultValue: '0',
        validators: [Validators.required, ValidateNumber]
      }
    ]
  ]
]);

export interface FieldConfig {
  defaultValue: string;
  placeholder?:  string;
  validators?: ValidatorFn[];
}
