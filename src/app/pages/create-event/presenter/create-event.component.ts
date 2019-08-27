import { Component, OnInit, ViewChild, Output, EventEmitter, LOCALE_ID } from '@angular/core';
import { Form, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatStepper, MatStep, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { EventsService } from 'src/app/shared/services/events.service';
import { Category } from 'src/app/shared/components/category';
import { SafeMethodCall } from '@angular/compiler';

export interface Category {
  title: string;
}

@Component({
  selector: 'app-ui-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})

export class CreateEventComponent implements OnInit {

  disabled = false;

  public all_items: Category[] = [];
  public items: Category[] = [];
  dataSource: Category[] = [];

  public all_items_tags: Category[] = [];
  public items_tags: Category[] = [];
  dataSource_tags: Category[] = [];

  isLinear = false;
  imageHeaderDefaultValue: string = '';
  generalForm: FormGroup;
  dateAndLocationForm: FormGroup;
  today: Date = new Date();
  minDate: Date = new Date();
  currentHourAndMinutes: string =
    this.today.getHours().toString() + ':' + this.today.getMinutes().toString();

  @Output() emitFormData = new EventEmitter<FormGroup[]>();
  @ViewChild('startDatePicker') startDatePicker;


  categories;


  subjects;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isTablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe,
    private navigation: Router,
    private eventService: EventsService
  ) { }

  ngOnInit() {
    this.generalForm = this.formBuilder.group({
      title             : [null, Validators.required],
      description       : [null, Validators.required],
      price             : [0.00, Validators.required],
      maxNumberOfSeats  : [12, Validators.required],
      category          : [null, Validators.required],
      subjects          : [null, Validators.required],
      additionalHours   : [null], disabled: this.disabled,
      subscriptionLink  : [null, Validators.required],
      headerImage       : ['', Validators.required],
    });


    this.dateAndLocationForm = this.formBuilder.group({
      street          : ['', Validators.required],
      number          : ['', Validators.required],
      additionalInfo  : ['', Validators.required],
      district        : [null, Validators.required],
      cep             : [null, [Validators.required, Validators.maxLength(8)]],
      city            : { value: 'Porto Alegre', disabled: true },
      state           : { value: 'RS', disabled: true },
      observation     : [null, [Validators.maxLength(600)]],
      startDate       : [null, Validators.required],
      startHour       : ['00:00', Validators.required],
      endDate         : [null, Validators.required],
      endHour         : ['00:00', Validators.required]
    });

    this.getCategories();
    this.getTags();
  }

  getErrorMessage() {

  }


  onFormSubmit() {
    const formsData                   = [];
    const generalFormControls         = Object.keys(this.generalForm.controls);
    const dateAndLocationFormControls = Object.keys(this.dateAndLocationForm.controls);

    generalFormControls.forEach(control => {
      formsData.push({
        controlName: control,
        controlValue: this.generalForm.get(control).value
      });
    });

    dateAndLocationFormControls.forEach(control => {
      formsData.push({
        controlName: control,
        controlValue: this.dateAndLocationForm.get(control).value
      });
    });

    this.emitFormData.emit([this.generalForm, this.dateAndLocationForm]);
  }

  onDateChange(date: MatDatepickerInputEvent<Date>) {
    this.minDate = date.value;
  }

  //Get categorias
  setAll(items) {
    this.all_items = items;
    this.items = this.all_items;
    this.dataSource = this.all_items;
    console.log(this.dataSource);
  }

  setAllTags(items_tags) {
    this.all_items_tags = items_tags;
    this.items_tags = this.all_items_tags;
    this.dataSource_tags = this.all_items_tags;
    console.log(this.dataSource_tags);
  }

  getCategories() {

    this.eventService.get_categories().subscribe(
      (itens: Category) => {
        this.setAll(itens),
          this.categories = this.dataSource
      }
    );

  }

  getTags() {
    this.eventService.get_tags().subscribe(
      (itens_tags: Category) => {
        this.setAllTags(itens_tags),
          this.subjects = this.dataSource_tags
      }
    );
  }

  disableadditionalHours() {
    if(this.disabled) {
      console.log('false')
      this.generalForm.get('additionalHours').enable()
    } else {
      console.log('true')
      this.generalForm.get('additionalHours').disable()
      this.generalForm.get('additionalHours').setValue(0)

    }
    this.disabled = !this.disabled;
  }
}
