import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Task3DetailComponent } from './task-3-detail.component';

describe('Task3 Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Task3DetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: Task3DetailComponent,
              resolve: { task3: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(Task3DetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load task3 on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', Task3DetailComponent);

      // THEN
      expect(instance.task3).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
