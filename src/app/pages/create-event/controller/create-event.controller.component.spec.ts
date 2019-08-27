import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventControllerComponent } from './create-event.controller.component';

describe('CreateEventControllerComponent', () => {
  let component: CreateEventControllerComponent;
  let fixture: ComponentFixture<CreateEventControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
