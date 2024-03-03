import {CustomerEventProperty} from "./customer-event-property.type";


export interface CustomerEvent  {
  type: string;
  properties: CustomerEventProperty[];
}
