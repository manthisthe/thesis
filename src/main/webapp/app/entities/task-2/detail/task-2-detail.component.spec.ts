import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Task2DetailComponent } from './task-2-detail.component';

describe('Task2 Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Task2DetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: Task2DetailComponent,
              resolve: { task2: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(Task2DetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load task2 on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', Task2DetailComponent);

      // THEN
      expect(instance.task2).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
