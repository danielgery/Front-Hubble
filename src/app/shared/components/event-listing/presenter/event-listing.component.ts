import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ActionTypesEnum } from 'src/app/shared/enums/ActionTypesEnum';
import { ActionButtonTextEnum } from 'src/app/shared/enums/ActionButtonTextEnum';
import { EventListingObject } from 'src/app/shared/interfaces/EventListingSchema';
import { EventCardObject } from 'src/app/shared/interfaces/EventCardSchema';
import { EventCard } from 'src/app/shared/interfaces/EventCard';


@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss']
})

export class EventListingComponent implements OnInit, OnChanges {

  @Input('data') pageData: EventListingObject;
  @Output() selectedEventCard: EventEmitter<EventCard>;

  constructor() {
    this.selectedEventCard = new EventEmitter<EventCard>();
  }

  ngOnChanges(change: SimpleChanges){
    console.log('CURRENT VALUE: ',change.pageData.currentValue);

  }

  ngOnInit() {}

  cardActionHandler($event: EventCard){
    this.selectedEventCard.emit($event);
  }

}
