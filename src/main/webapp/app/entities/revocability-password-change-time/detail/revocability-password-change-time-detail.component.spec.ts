import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { RevocabilityPasswordChangeTimeDetailComponent } from './revocability-password-change-time-detail.component';

describe('RevocabilityPasswordChangeTime Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevocabilityPasswordChangeTimeDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: RevocabilityPasswordChangeTimeDetailComponent,
              resolve: { revocabilityPasswordChangeTime: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(RevocabilityPasswordChangeTimeDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load revocabilityPasswordChangeTime on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', RevocabilityPasswordChangeTimeDetailComponent);

      // THEN
      expect(instance.revocabilityPasswordChangeTime).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
