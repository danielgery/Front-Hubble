import { ActionButtonTextEnum } from '../enums/ActionButtonTextEnum';
import { ActionTypesEnum } from '../enums/ActionTypesEnum';

interface EventCard {
  actionType: ActionTypesEnum,
  buttonText: ActionButtonTextEnum,
  id: string,
  title: string,
  startDate: string,
  endDate: string,
  startHour: string,
  endHour: string,
  price: string,
  address: {
    street: string,
    number: number,
    complements: string,
    zipCode: string,
    district: string,
    city: string,
    state: string
  }
}
export {EventCard};
