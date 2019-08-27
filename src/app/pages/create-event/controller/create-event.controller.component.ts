import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { EventsService } from 'src/app/shared/services/events.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.controller.component.html',
  styleUrls: ['./create-event.controller.component.scss']
})
export class CreateEventControllerComponent implements OnInit {
  constructor(private eventService: EventsService, private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  onFormSubmitted($event: FormGroup[]){
    const response = this.eventService.create($event)
      .subscribe(
        (success: HttpResponse<JSON>) => {
          this.snackBar.open('Evento cadastrado com sucesso!', 'Ok', {duration: 5000});
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open('Não foi possível cadastrar o evento. (Erro: '+error.message+')', 'Ok', {duration: 5000});
        }
      );
  }
}
