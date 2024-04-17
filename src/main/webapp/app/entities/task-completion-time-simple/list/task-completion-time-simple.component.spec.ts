import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaskCompletionTimeSimpleService } from '../service/task-completion-time-simple.service';

import { TaskCompletionTimeSimpleComponent } from './task-completion-time-simple.component';

describe('TaskCompletionTimeSimple Management Component', () => {
  let comp: TaskCompletionTimeSimpleComponent;
  let fixture: ComponentFixture<TaskCompletionTimeSimpleComponent>;
  let service: TaskCompletionTimeSimpleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'task-completion-time-simple', component: TaskCompletionTimeSimpleComponent }]),
        HttpClientTestingModule,
        TaskCompletionTimeSimpleComponent,
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
      .overrideTemplate(TaskCompletionTimeSimpleComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaskCompletionTimeSimpleComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(TaskCompletionTimeSimpleService);

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
    expect(comp.taskCompletionTimeSimples?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to taskCompletionTimeSimpleService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTaskCompletionTimeSimpleIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getTaskCompletionTimeSimpleIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
