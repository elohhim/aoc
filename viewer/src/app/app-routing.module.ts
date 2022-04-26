import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { EventKeyGuard } from './+guards/event-key.guard';
import { SolutionKeyGuard } from './+guards/solution-key.guard';
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
    canActivate: [EventKeyGuard],
    component: EventKeyProviderComponent,
    children: [
      {
        path: '',
        component: SolutionsComponent,
        children: [
          {
            path: ':language',
            canActivate: [SolutionKeyGuard],
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

const config: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
