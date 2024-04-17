import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaskCompletionTime2DetailComponent } from './task-completion-time-2-detail.component';

describe('TaskCompletionTime2 Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCompletionTime2DetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: TaskCompletionTime2DetailComponent,
              resolve: { taskCompletionTime2: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(TaskCompletionTime2DetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load taskCompletionTime2 on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', TaskCompletionTime2DetailComponent);

      // THEN
      expect(instance.taskCompletionTime2).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
