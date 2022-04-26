import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionKeyProviderComponent } from './solution-key-provider.component';

describe('SolutionKeyProviderComponent', () => {
  let component: SolutionKeyProviderComponent;
  let fixture: ComponentFixture<SolutionKeyProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionKeyProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionKeyProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
