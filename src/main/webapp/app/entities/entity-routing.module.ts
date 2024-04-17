import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'task-completion-time-simple',
        data: { pageTitle: 'TaskCompletionTimeSimples' },
        loadChildren: () => import('./task-completion-time-simple/task-completion-time-simple.routes'),
      },
      {
        path: 'task-completion-time-2',
        data: { pageTitle: 'TaskCompletionTime2s' },
        loadChildren: () => import('./task-completion-time-2/task-completion-time-2.routes'),
      },
      {
        path: 'revocability-password-change-time',
        data: { pageTitle: 'RevocabilityPasswordChangeTimes' },
        loadChildren: () => import('./revocability-password-change-time/revocability-password-change-time.routes'),
      },
      {
        path: 'task-1-visibility',
        data: { pageTitle: 'Task1Visibilities' },
        loadChildren: () => import('./task-1-visibility/task-1-visibility.routes'),
      },
      {
        path: 'task-2',
        data: { pageTitle: 'Task2s' },
        loadChildren: () => import('./task-2/task-2.routes'),
      },
      {
        path: 'task-3',
        data: { pageTitle: 'Task3s' },
        loadChildren: () => import('./task-3/task-3.routes'),
      },
      {
        path: 'task-4',
        data: { pageTitle: 'Task4s' },
        loadChildren: () => import('./task-4/task-4.routes'),
      },
      {
        path: 'task-5',
        data: { pageTitle: 'Task5s' },
        loadChildren: () => import('./task-5/task-5.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
