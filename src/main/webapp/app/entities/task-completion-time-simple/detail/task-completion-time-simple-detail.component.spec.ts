import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaskCompletionTimeSimpleDetailComponent } from './task-completion-time-simple-detail.component';

describe('TaskCompletionTimeSimple Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCompletionTimeSimpleDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TaskCompletionTimeSimpleDetailComponent,
              resolve: { taskCompletionTimeSimple: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TaskCompletionTimeSimpleDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load taskCompletionTimeSimple on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TaskCompletionTimeSimpleDetailComponent);

      // THEN
      expect(instance.taskCompletionTimeSimple).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
