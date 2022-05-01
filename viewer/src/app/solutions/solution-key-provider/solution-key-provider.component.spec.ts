import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ParamsResolveService } from 'src/app/+service/params-resolve.service';
import { EventKeyProviderComponent } from '../event-key-provider/event-key-provider.component';

import { SolutionKeyProviderComponent } from './solution-key-provider.component';

describe('SolutionKeyProviderComponent', () => {
  let component: SolutionKeyProviderComponent;
  let fixture: ComponentFixture<SolutionKeyProviderComponent>;

  beforeEach(async () => {
    const fakeActivatedRoute: Pick<ActivatedRoute, 'params'> = {
      params: of({
        language: 'Python',
      }),
    };
    await TestBed.configureTestingModule({
      declarations: [SolutionKeyProviderComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute,
        },
        {
          provide: ParamsResolveService,
          useValue: {} as Partial<ParamsResolveService>,
        },
        {
          provide: EventKeyProviderComponent,
          useValue: {
            eventKey$: of({ event: 2015, day: 1 }),
          } as Partial<EventKeyProviderComponent>,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionKeyProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide solution key based on event key provider and activated route language param', () => {
    throw new Error('Not implement yet!');
  });
});
