import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CustomerEvents} from "../types/customer-events.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerEventsService {

  private readonly baseUrl = `${environment.apiUrl}customer-events/`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getEvents(): Observable<CustomerEvents> {
    return this.httpClient.get<CustomerEvents>(`${this.baseUrl}events.json`);
  }
}
