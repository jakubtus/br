import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CustomerEvent} from "../../backend/types/customer-event.type";
import {SelectComponent} from "../../ui-components/select/select.component";
import {SelectOptionComponent} from "../../ui-components/select/select-option/select-option.component";
import {TextFieldComponent} from "../../ui-components/text-field/text-field.component";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from "@angular/forms";
import {FilterStepFormData, FilterStepFormEventData} from "./types/filter-step-form-data.type";
import {ButtonComponent} from "../../ui-components/button/button.component";
import {OperatorSelectComponent} from "./operator-select/operator-select.component";
import {FieldConfig, operatorFieldConfig} from "./types/operator-field-config";
import {Operator} from "./enums/operator.enum";
import {PropertyType} from "../../backend/enums/property-type.enum";
import {StringToOperator} from "./utils/string-to-operator";
import {Subject, takeUntil} from "rxjs";
import {BaseControlValueAccessor} from "../../ui-components/abstracts/base-control-value-accessor";
import {FilterStep} from "./types/filter-step.type";

@Component({
  selector: 'br-filter-step',
  standalone: true,
  imports: [
    SelectComponent,
    SelectOptionComponent,
    TextFieldComponent,
    ReactiveFormsModule,
    ButtonComponent,
    OperatorSelectComponent,
  ],
  templateUrl: './filter-step.component.html',
  styleUrl: './filter-step.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterStepComponent),
      multi: true,
    },
  ],
})
export class FilterStepComponent extends BaseControlValueAccessor<FilterStep> implements OnInit, OnDestroy {

  @Input() title!: string;

  @Input() customerEvents!: CustomerEvent[];

  @Input() canCopy = true;

  @Input() canRemove = true;

  @Output() copy = new EventEmitter<FilterStep>();

  @Output() remove = new EventEmitter<void>();

  eventTypes!: string[];
  availableEventProperties!: Nullable<string[]>;
  selectedEvent?: CustomerEvent;
  form: FormGroup;

  protected readonly StringToOperator = StringToOperator;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    super();

    this.form = this.fb.group<FilterStepFormData>({
      eventType: this.fb.control<Nullable<string>>(null),
      eventProperties: this.fb.array<FormGroup<FilterStepFormEventData>>([]),
    });
  }

  get eventPropertiesControls(): AbstractControl[] {
    return this.eventPropertiesArray.controls;
  }

  get eventPropertiesArray(): FormArray {
    return this.form.get('eventProperties') as FormArray;
  }

  ngOnInit(): void {
    this.filterEvents();

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
      this.innerValue = this.form.getRawValue();
      if (this.onChangeFn) {
        this.onChangeFn(this.form.getRawValue());
      }
    });

    this.form.get('eventType')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.selectedEvent = this.customerEvents.find(_ => _.type === value);
        this.availableEventProperties = this.selectedEvent?.properties.map(_ => _.property) ?? null;
        this.eventPropertiesArray.clear();
      });
  }

  canAddAttribute(): boolean {
    return this.form.get('eventType')?.value;
  }

  onCopy(): void {
    this.copy.emit(this.form.getRawValue() as FilterStep);
  }

  onRemove(): void {
    this.remove.emit();
  }

  removeAttribute(index: number): void {
    this.eventPropertiesArray.removeAt(index);
  }

  onPropertyChange(index: number): void {
    const properties = this.customerEvents.find(_ => _.type === this.form.get('eventType')?.value)?.properties

    if (properties) {
      const type = properties.find(_ => _.property === this.eventPropertiesArray.at(index).get('property')?.value)?.type;

      if (type) {
        const operator = type === PropertyType.STRING ? Operator.equals : Operator.equal_to;
        this.eventPropertiesArray.at(index).get('operator')?.patchValue(operator);
      }
    }
  }

  hasDefinedAttribute(index: number): boolean {
    return this.eventPropertiesArray.at(index).get('property')?.value;
  }

  addEventProperties(): void {
    const eventProperties = this.fb.group<FilterStepFormEventData>({
      property: this.fb.control<Nullable<string>>(null),
      operator: this.fb.control<Nullable<string>>(null),
      values: this.fb.array<FormControl<Nullable<string>>>([
        this.fb.control<string>('')
      ]),
    });

    this.eventPropertiesArray.push(eventProperties);
  }

  addValueFields(index: number): void {
    const valuesArray = this.eventPropertiesArray.at(index).get('values') as FormArray;
    valuesArray.clear();
    const operator = this.eventPropertiesArray.at(index).get('operator')?.value;
    if (operator != null) {
      const fieldConfig = this.getFieldsConfig(StringToOperator(operator));
      fieldConfig?.forEach(_ => {
        valuesArray.push(this.fb.control<string>(_.defaultValue, _.validators));
      });
    }
  }

  getFieldsConfig(operator: Operator): FieldConfig[] {
    return operatorFieldConfig.get(operator) ?? [];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  override writeValue(obj: FilterStep): void {
    super.writeValue(obj);

    if (obj) {
      this.form.get('eventType')?.patchValue(obj.eventType, {emitEvent: true});

      obj.eventProperties?.forEach(_ => {
        const values = _.values.map(value => this.fb.control(value));

        this.eventPropertiesArray.push(this.fb.group({
          property: [_.property],
          operator: [_.operator],
          values: this.fb.array(values)
        }))

      });

    }
  }

  private filterEvents(): void {
    this.eventTypes = this.customerEvents.map(_ => _.type);
  }
}
