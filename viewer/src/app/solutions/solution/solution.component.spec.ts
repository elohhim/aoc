import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AocLinkPipe } from 'src/app/lib/aoc-link.pipe';
import { FileNamePipe } from 'src/app/lib/file-name.pipe';
import { GitHubLinkPipe } from 'src/app/lib/git-hub-link.pipe';
import { EventKeyProviderComponent } from '../event-key-provider/event-key-provider.component';
import { SolutionKeyProviderComponent } from '../solution-key-provider/solution-key-provider.component';
import { SolutionLanguagesPipe } from '../solutions/solution-languages.pipe';

import { SolutionComponent } from './solution.component';

describe('SolutionComponent', () => {
  let component: SolutionComponent;
  let fixture: ComponentFixture<SolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionComponent, GitHubLinkPipe, FileNamePipe],
      providers: [
        {
          provide: SolutionKeyProviderComponent,
          useValue: {
            solutionKey$: of({ event: 2015, day: 1, language: 'Python' }),
          } as Partial<SolutionKeyProviderComponent>,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
