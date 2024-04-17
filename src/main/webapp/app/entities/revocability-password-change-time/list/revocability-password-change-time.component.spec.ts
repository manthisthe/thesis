import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { RevocabilityPasswordChangeTimeService } from '../service/revocability-password-change-time.service';

import { RevocabilityPasswordChangeTimeComponent } from './revocability-password-change-time.component';

describe('RevocabilityPasswordChangeTime Management Component', () => {
  let comp: RevocabilityPasswordChangeTimeComponent;
  let fixture: ComponentFixture<RevocabilityPasswordChangeTimeComponent>;
  let service: RevocabilityPasswordChangeTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'revocability-password-change-time', component: RevocabilityPasswordChangeTimeComponent }]),
        HttpClientTestingModule,
        RevocabilityPasswordChangeTimeComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(RevocabilityPasswordChangeTimeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RevocabilityPasswordChangeTimeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RevocabilityPasswordChangeTimeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.revocabilityPasswordChangeTimes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to revocabilityPasswordChangeTimeService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getRevocabilityPasswordChangeTimeIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getRevocabilityPasswordChangeTimeIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
