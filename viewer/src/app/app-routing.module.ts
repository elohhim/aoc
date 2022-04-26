import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventKeyProviderComponent } from './solutions/event-key-provider/event-key-provider.component';
import { SolutionKeyProviderComponent } from './solutions/solution-key-provider/solution-key-provider.component';
import { SolutionComponent } from './solutions/solution/solution.component';
import { SolutionsComponent } from './solutions/solutions/solutions.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'event/:event/day/:day',
    component: EventKeyProviderComponent,
    children: [
      {
        path: '',
        component: SolutionsComponent,
        children: [
          {
            path: ':language',
            component: SolutionKeyProviderComponent,
            children: [
              {
                path: '',
                component: SolutionComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
