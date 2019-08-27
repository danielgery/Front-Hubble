import { ActionTypesEnum } from "../enums/ActionTypesEnum";
import { ActionButtonTextEnum } from "../enums/ActionButtonTextEnum";
import { EventCard } from './EventCard';


interface EventCardObject {
  events: EventCard[]
}


interface EventListingObject {
  header: string,
  subHeader: string,
  tabs: [
    {
      title: string,
      cards: EventCardObject
    }
  ]
}
export {EventListingObject};
