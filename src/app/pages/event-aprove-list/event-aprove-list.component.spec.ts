import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAproveListComponent } from './event-aprove-list.component';

describe('EventAproveListComponent', () => {
  let component: EventAproveListComponent;
  let fixture: ComponentFixture<EventAproveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAproveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAproveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
