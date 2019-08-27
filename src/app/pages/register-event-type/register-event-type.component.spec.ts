import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEventTypeComponent } from './register-event-type.component';

describe('RegisterEventTypeComponent', () => {
  let component: RegisterEventTypeComponent;
  let fixture: ComponentFixture<RegisterEventTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEventTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
