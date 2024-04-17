import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Task1VisibilityDetailComponent } from './task-1-visibility-detail.component';

describe('Task1Visibility Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Task1VisibilityDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: Task1VisibilityDetailComponent,
              resolve: { task1Visibility: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(Task1VisibilityDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load task1Visibility on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', Task1VisibilityDetailComponent);

      // THEN
      expect(instance.task1Visibility).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
