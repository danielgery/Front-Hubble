import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators  } from '@angular/forms';
import { EventsService } from 'src/app/shared/services/events.service';
import { MatSnackBar } from '@angular/material';
import { delay } from 'q';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {
  profileForm: FormGroup;


  constructor(
    private eventService: EventsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  }


  async onSubmit() {

    if (this.profileForm.invalid) {
      return;
    }

    const formsData = [];
    const FormControls = Object.keys(this.profileForm.controls);

    FormControls.forEach(control => {
      formsData.push({
          controlName   : control,
          controlValue  : this.profileForm.get(control).value
      });
    });

    var $event = []
    $event[0] = this.profileForm;
    const response = this.eventService.create_user($event);
    response.subscribe(obj => this.snackBar.open("Cadastrado com sucesso","Ok",{duration:5000}));
    delay(1000).then(any =>
      window.location.replace('/login')
    )
  }
}
