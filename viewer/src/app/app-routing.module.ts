import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionComponent } from './solutions/solution/solution.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'event/:event/day/:day',
    component: SolutionsComponent,
    children: [
      {
        path: ':language',
        component: SolutionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
