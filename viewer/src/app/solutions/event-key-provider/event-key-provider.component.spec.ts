import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventKeyProviderComponent } from './event-key-provider.component';

describe('EventKeyProviderComponent', () => {
  let component: EventKeyProviderComponent;
  let fixture: ComponentFixture<EventKeyProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventKeyProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventKeyProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
