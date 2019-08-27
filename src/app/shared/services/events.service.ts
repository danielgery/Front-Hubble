import { Event } from './../components/event';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Category } from '../components/category';
import { EventCard } from '../interfaces/EventCard';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/app/pages/_models/user';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  endpoint: string;
  currentUser: User;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.endpoint = environment.apiUrl + 'event';
    this.currentUser = authService.currentUserValue;

  }

  create(rawPayload: FormGroup[]) {
    const payload = this.normalizePayload(rawPayload);
    return this.httpClient.post(environment.apiUrl + 'event', payload);
  }

  create_user(rawPayload: FormGroup[]) {
    const payload = this.normalizeUserPayload(rawPayload);
    return this.httpClient.post(environment.apiUrl + 'user', payload);
  }
  fetch() {
    return this.httpClient.get(environment.apiUrl + 'event/status/aprovado');
  }


  fetch_pending(): Observable<EventCard[]> {
    return this.httpClient.get<EventCard[]>(environment.apiUrl + 'event/status/pendente');
  }


  get_categories() {
    return this.httpClient.get(environment.apiUrl + 'category');
  }

  delete_category(id: string) {
    return this.httpClient.delete(environment.apiUrl + 'category/' + id);
  }

  createCategory(Payload: FormGroup) {
    const payload = this.normPayload(Payload);
    return this.httpClient.post(environment.apiUrl + 'category', payload);
  }

  get_tags() {
    return this.httpClient.get(environment.apiUrl + 'tag');
  }

  delete_tag(id: string) {
    return this.httpClient.delete(environment.apiUrl + 'tag/' + id);
  }

  createTag(Payload: FormGroup) {
    const payload = this.normPayloadTag(Payload);
    return this.httpClient.post(environment.apiUrl + 'tag', payload)
  }

  private normPayloadTag(Payload: FormGroup) {
    const genForm = Payload;

    const normzPayloadTag = {
      title: genForm.get('tagName').value
    };
    console.log('Tag Normalized: ' + normzPayloadTag);
    return normzPayloadTag;
  }

  private normPayload(Payload: FormGroup) {
    const genForm = Payload;

    const normzPayload = {
      title: genForm.get('catName').value
    };
    console.log('Normalized: ' + normzPayload);
    return normzPayload;

  }

  private normalizePayload(rawPayload: FormGroup[]) {
    const generalForm = rawPayload[0];
    const dateAndLocationForm = rawPayload[1];
    const normalizedPayload = {
      createdBy   : this.currentUser.id,
      title       : generalForm.get('title').value,
      description : generalForm.get('description').value,
      price       : generalForm.get('price').value,
      vacancies   : generalForm.get('maxNumberOfSeats').value,
      category    : generalForm.get('category').value,
      tag         : generalForm.get('subjects').value,
      hours       : parseInt(generalForm.get('additionalHours').value),
      state       : dateAndLocationForm.get('state').value,
      city        : dateAndLocationForm.get('city').value,
      picture     : generalForm.get('headerImage').value,
      link        : generalForm.get('subscriptionLink').value,
      startDate   : this.formatarData(dateAndLocationForm.get('startDate').value),
      endDate     : this.formatarData(dateAndLocationForm.get('endDate').value),
      endHour     : dateAndLocationForm.get('endHour').value,
      startHour   : dateAndLocationForm.get('startHour').value,
      address: {
        street      : dateAndLocationForm.get('street').value,
        complements : dateAndLocationForm.get('additionalInfo').value,
        zipCode     : dateAndLocationForm.get('cep').value,
        district    : dateAndLocationForm.get('district').value,
        city        : dateAndLocationForm.get('city').value,
        state       : dateAndLocationForm.get('state').value,
        number      : dateAndLocationForm.get('number').value
      },
    };
    return normalizedPayload;
  }

formatarData(data: Date){
  return data.getDate().toString() + "/" + data.getMonth().toString() + "/" + data.getFullYear().toString();
}

getById(id: string): Observable<Event> {
  return this.httpClient.get<Event>(environment.apiUrl + 'event/' + id);
}

getCategories(): Observable<Category[]> {
  return this.httpClient.get<Category[]>(environment.apiUrl + 'category');
}

getCategoriesFromUser(id: String): Observable<Category[]> {
  return this.httpClient.get<Category[]>
    (environment.apiUrl + 'user/categories/interestCategories/' + id);
}

updateCategory(idCategory: string, idUser: string) {
  const url = environment.apiUrl + 'user/updateCategoria/' + idUser;
  console.log(url);
  this.httpClient.post<string>(url , {idCategoria : idCategory}).subscribe(
    response => console.log(response)
  );
}

  private normalizeUserPayload(rawPayload: FormGroup[]){
    const generalForm         = rawPayload[0];
    const normalizedPayload   = {
      firstName         : generalForm.get('firstName').value,
      lastName          : generalForm.get('lastName').value,
      email             : generalForm.get('email').value,
      password          : generalForm.get('password').value
    };
    return normalizedPayload;
  }

  cancelSubscription(eventId: string): Promise<Object> {
    if (!this.currentUser) return null;
    return this.confirmEvent(""+this.currentUser.id, eventId);
  }

  removeFromFavorites(eventId: string): Promise<Object> {
    if (!this.currentUser) return null;
    return this.favoriteEvent(""+this.currentUser.id, eventId);
  }

  getParticipatedEvents() {
    if (!this.currentUser) return null;
    const endpoint = environment.apiUrl + 'user/events/participatedEvents/' + this.currentUser.id;
    return this.httpClient.get(endpoint).toPromise();
  }

  /**
   *
   */
  getFavoriteEvents(): Promise<Object> {
    if (!this.currentUser) return null;
    const endpoint = `${environment.apiUrl}user/events/favoritedEvents/${this.currentUser.id}`;
    return this.httpClient.get(endpoint).toPromise();
  }

  getFavoriteEventsObs(): Observable<Object> {
    if (!this.currentUser) return null;
    const endpoint = `${environment.apiUrl}user/events/favoritedEvents/${this.currentUser.id}`;
    return this.httpClient.get(endpoint);
  }

  getCreatedEvents(): Promise<Object> {
    if (!this.currentUser) return null;
    const endpoint = `${environment.apiUrl}user/events/createdEvents/${this.currentUser.id}`;
    return this.httpClient.get(endpoint).toPromise();
  }

  /**
   * @TODO qual a diferença deste método para getFavoriteEvents???
   * @param idUser
   * @param event
   */
  getFavoriteEvent(idUser: string, event: string): Promise<any> {
    return this.httpClient.post<any>(environment.apiUrl + 'user/favoritado/' + idUser, { idEvent: event })
      .toPromise()
      .then((resposta: any) => resposta);
  }


  favoriteEvent(idUser: string, event: string): Promise<any> {
    return this.httpClient.put<any>(environment.apiUrl + 'user/favoritar/' + idUser, { idEvent: event })
      .toPromise()
      .then((resposta: Response) => resposta);
  }
  AprovarEvent(event: string): Promise<any> {
    return this.httpClient.put<any>(environment.apiUrl + 'event/status/aprovado/' + event, {})
      .toPromise()
      .then((resposta: Response) => resposta);
  }

  ReproveEvent(event: string): Promise<any> {
    return this.httpClient.put<any>(environment.apiUrl + 'event/status/rejeitado/' + event, {})
      .toPromise()
      .then((resposta: Response) => resposta);
  }



  getConfirmedEvent(idUser: string, event: string): Promise<any> {
    return this.httpClient.post<any>(environment.apiUrl + 'user/confirmado/' + idUser, { idEvent: event })
      .toPromise()
      .then((resposta: any) => resposta);
  }


  confirmEvent(idUser: string, event: string): Promise<any> {
    return this.httpClient.post<any>(environment.apiUrl + 'user/confirmar/' + idUser, { idEvent: event })
      .toPromise()
      .then((resposta: Response) => resposta);
  }

delete(id: string): Promise<any> {
  return this.httpClient.delete(environment.apiUrl + 'event/' + id)
  .toPromise()
  .then(() => null )
  .catch();
}
   updateEvent(idEvent: string, event: Event): Promise<any> {
    return this.httpClient.put<any>(environment.apiUrl + 'event/' + idEvent, event)
    .toPromise()
    .then((resposta: Response) => resposta);
   }

   getEventsByFavoriteCategories(): Observable<Event[]> {
    if (!this.currentUser) return null;
    const endpoint = `${environment.apiUrl}user/category/${this.currentUser.id}`;
    return this.httpClient.get<Event[]>(endpoint);
   }
}
