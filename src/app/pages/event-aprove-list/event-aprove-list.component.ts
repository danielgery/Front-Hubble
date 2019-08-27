import { Component, OnInit } from '@angular/core';
import { EventListingObject } from 'src/app/shared/interfaces/EventListingSchema';
import { ActionTypesEnum } from 'src/app/shared/enums/ActionTypesEnum';
import { ActionButtonTextEnum } from 'src/app/shared/enums/ActionButtonTextEnum';
import { EventCardObject } from 'src/app/shared/interfaces/EventCardSchema';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/shared/services/events.service';

@Component({
  selector: 'app-event-aprove-list',
  templateUrl: './event-aprove-list.component.html',
  styleUrls: ['./event-aprove-list.component.scss']
})

export class EventAproveListComponent implements OnInit {
  meuJson: EventListingObject = {
    header: "Validar eventos",
    subHeader: "Uma descrição para a página de validar eventos",
    tabs: [
      {
        title: "Para aprovar",
        cards: {
          events:[]
        }
      }
    ]
  };
  constructor(private eventService: EventsService,
    private router: Router,) {
    const response = this.eventService.fetch_pending();
    response.subscribe(
      items => this.meuJson.tabs[0].cards.events = this.injectButton(items),
      error => console.log(error)
    )
   }

  ngOnInit() {
  }

  injectButton($itens) {
    $itens.forEach(event => {
      event.buttonText = ActionButtonTextEnum.TO_APPROVE
    });
    return $itens
  }


  onEventCardSelected($eventCard: EventCardObject){
    console.log('Card que chegou: ',$eventCard['id']);
    this.router.navigate(['admin/detalhe-evento/'+$eventCard['id']])
  }
}
