import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { LibModule } from '../lib/lib.module';
import { EventKeyProviderComponent } from './event-key-provider/event-key-provider.component';
import { SolutionKeyProviderComponent } from './solution-key-provider/solution-key-provider.component';
import { SolutionLanguagesPipe } from './solutions/solution-languages.pipe';
import { SolutionComponent } from './solution/solution.component';
import { SolutionsComponent } from './solutions/solutions.component';

@NgModule({
  declarations: [
    SolutionsComponent,
    SolutionComponent,
    SolutionLanguagesPipe,
    EventKeyProviderComponent,
    SolutionKeyProviderComponent,
  ],
  imports: [CommonModule, LibModule, RouterModule, MarkdownModule.forChild()],
  exports: [SolutionsComponent],
})
export class SolutionsModule {}
