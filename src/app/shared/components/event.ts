import { User } from 'src/app/pages/_models/user';
import { Category } from './category';
import { Address } from './address';

export class Event {
  address: Address;
  createdBy: any;
  category: Category;
  status: string;
  tag: any[];
  confirmedUsers: any[];
  _id: string;
  title: string;
  description: string;
  picture: string;
  price: number;
  hours: string;
  startDate: string;
  endDate: string;
  startHour: string;
  endHour: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  vacancies: number;
  link: string;
}
