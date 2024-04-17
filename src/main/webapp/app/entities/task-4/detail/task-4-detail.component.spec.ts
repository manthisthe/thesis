import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Task4DetailComponent } from './task-4-detail.component';

describe('Task4 Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Task4DetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: Task4DetailComponent,
              resolve: { task4: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(Task4DetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load task4 on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', Task4DetailComponent);

      // THEN
      expect(instance.task4).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
