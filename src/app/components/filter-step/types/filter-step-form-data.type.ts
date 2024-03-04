import {FormArray, FormControl} from "@angular/forms";

export interface FilterStepFormEventData {
  property: FormControl<Nullable<string>>;
  operator: FormControl<Nullable<string>>;
  values: FormArray;
}

export interface FilterStepFormData  {
  eventType: FormControl<Nullable<string>>;
  eventProperties: FormArray;
}
