import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Task5DetailComponent } from './task-5-detail.component';

describe('Task5 Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Task5DetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: Task5DetailComponent,
              resolve: { task5: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(Task5DetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load task5 on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', Task5DetailComponent);

      // THEN
      expect(instance.task5).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
