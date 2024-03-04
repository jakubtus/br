import {FilterStepEvent} from "./filter-step-event.type";

export interface FilterStep {
  eventType?: string;
  eventProperties?: FilterStepEvent[];
}
