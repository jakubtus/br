import {Component, Input, OnInit} from '@angular/core';
import {FilterStepComponent} from "../filter-step/filter-step.component";
import {ButtonComponent} from "../../ui-components/button/button.component";
import {SelectComponent} from "../../ui-components/select/select.component";
import {MatOption} from "@angular/material/autocomplete";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {SelectOptionComponent} from "../../ui-components/select/select-option/select-option.component";
import {CustomerEvent} from "../../backend/types/customer-event.type";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FilterStep} from "../filter-step/types/filter-step.type";

@Component({
  selector: 'br-filter',
  standalone: true,
  imports: [
    FilterStepComponent,
    ButtonComponent,
    SelectComponent,
    MatOption,
    MatTab,
    MatTabGroup,
    SelectOptionComponent,
    ReactiveFormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  @Input() title!: string;

  @Input() customerEvents?: CustomerEvent[];

  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.filterForm = this.fb.group({
      events: this.fb.array<FormControl<Nullable<FilterStep>>>([])
    });

  }

  get formEventsArray(): FormArray<FormControl<Nullable<FilterStep>>> {
    return (this.filterForm.get('events') as FormArray);
  }

  onRemoveStep(index: number): void {
    this.formEventsArray.removeAt(index);
  }

  onCopyStep(stepData: FilterStep): void {
    this.addFilterStep(stepData);
  }

  reset(): void {
    this.formEventsArray.clear();
    this.addFilterStep();
  }

  ngOnInit(): void {
    this.addFilterStep();
  }

  applyFilter(): void {
    console.log(this.filterForm.getRawValue());
  }

  addFilterStep(data: Nullable<FilterStep> = null): void {
    this.formEventsArray.push(this.fb.control<Nullable<FilterStep>>(data));
  }
}
