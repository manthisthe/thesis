import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Task1VisibilityService } from '../service/task-1-visibility.service';

import { Task1VisibilityComponent } from './task-1-visibility.component';

describe('Task1Visibility Management Component', () => {
  let comp: Task1VisibilityComponent;
  let fixture: ComponentFixture<Task1VisibilityComponent>;
  let service: Task1VisibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'task-1-visibility', component: Task1VisibilityComponent }]),
        HttpClientTestingModule,
        Task1VisibilityComponent,
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
      .overrideTemplate(Task1VisibilityComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(Task1VisibilityComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(Task1VisibilityService);

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
    expect(comp.task1Visibilities?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to task1VisibilityService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTask1VisibilityIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTask1VisibilityIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
