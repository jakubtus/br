import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {SelectComponent} from "../../../ui-components/select/select.component";
import {SelectOptionComponent} from "../../../ui-components/select/select-option/select-option.component";
import {OperatorType} from "../enums/operator-type.enum";
import {BaseControlValueAccessor} from "../../../ui-components/abstracts/base-control-value-accessor";
import {FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {Operator} from "../enums/operator.enum";
import {StringToOperator} from "../utils/string-to-operator";

@Component({
  selector: 'br-operator-select',
  standalone: true,
  imports: [
    SelectComponent,
    SelectOptionComponent,
    ReactiveFormsModule
  ],
  templateUrl: './operator-select.component.html',
  styleUrl: './operator-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OperatorSelectComponent),
      multi: true,
    },
  ],
})
export class OperatorSelectComponent extends BaseControlValueAccessor<string> implements OnInit {

  @Output() ecChange = new EventEmitter<string>();

  operatorTypeEnum = OperatorType;
  operatorsEnum = Operator;
  operatorType: OperatorType = OperatorType.STRING;
  selectControl = new FormControl();

  ngOnInit(): void {
    this.selectControl.valueChanges.subscribe(value => {
      this.innerValue = value;
      if (this.onChangeFn) {
        this.onChangeFn(value)
      }
      this.ecChange.emit(value);
    });
  }

  changeOperatorType(type: OperatorType): void {
    this.operatorType = type;
    if (type === OperatorType.STRING) {
      this.selectControl.patchValue(Operator.equals);
    } else if (type === OperatorType.NUMBER) {
      this.selectControl.patchValue(Operator.equal_to);
    }
  }

  override writeValue(value: string) {
    super.writeValue(value);

    switch (StringToOperator(value)) {
      case Operator.equal_to:
      case Operator.in_between:
      case Operator.less_than:
      case Operator.greater_than:
        this.operatorType = OperatorType.NUMBER;
        break;
      default:
        this.operatorType = OperatorType.STRING;
        break;
    }
    this.selectControl.patchValue(value);
  }

}
