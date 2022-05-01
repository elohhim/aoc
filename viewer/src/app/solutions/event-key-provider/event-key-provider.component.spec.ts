import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ParamsResolveService } from 'src/app/+service/params-resolve.service';

import { EventKeyProviderComponent } from './event-key-provider.component';

describe('EventKeyProviderComponent', () => {
  let component: EventKeyProviderComponent;
  let fixture: ComponentFixture<EventKeyProviderComponent>;

  beforeEach(async () => {
    const fakeActivatedRoute: Pick<ActivatedRoute, 'params'> = {
      params: of({
        event: '2015',
        day: '1',
      }),
    };
    await TestBed.configureTestingModule({
      declarations: [EventKeyProviderComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute,
        },
        {
          provide: ParamsResolveService,
          useValue: {} as Partial<ParamsResolveService>,
        },
      ],
    }).compileComponents();
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
