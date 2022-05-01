import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AocLinkPipe } from 'src/app/lib/aoc-link.pipe';
import { EventKeyProviderComponent } from '../event-key-provider/event-key-provider.component';
import { SolutionLanguagesPipe } from './solution-languages.pipe';
import { SolutionsComponent } from './solutions.component';

describe('SolutionsComponent', () => {
  let component: SolutionsComponent;
  let fixture: ComponentFixture<SolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SolutionsComponent, AocLinkPipe, SolutionLanguagesPipe],
      providers: [
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
    fixture = TestBed.createComponent(SolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
