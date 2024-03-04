import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CustomerEventsService} from "./backend/services/customer-events.service";
import {CustomerEvent} from "./backend/types/customer-event.type";
import {CommonModule} from "@angular/common";
import {FilterComponent} from "./components/filter/filter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FilterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Bloomreach assignment';
  data?: CustomerEvent[];

  constructor(
    private customerEventService: CustomerEventsService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.customerEventService.getEvents().subscribe(response => {
      this.data = response.events;
      this.cd.markForCheck();
    });
  }
}
