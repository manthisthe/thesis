import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TaskCompletionTime2Service } from '../service/task-completion-time-2.service';

import { TaskCompletionTime2Component } from './task-completion-time-2.component';

describe('TaskCompletionTime2 Management Component', () => {
  let comp: TaskCompletionTime2Component;
  let fixture: ComponentFixture<TaskCompletionTime2Component>;
  let service: TaskCompletionTime2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'task-completion-time-2', component: TaskCompletionTime2Component }]),
        HttpClientTestingModule,
        TaskCompletionTime2Component,
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
      .overrideTemplate(TaskCompletionTime2Component, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaskCompletionTime2Component);
    comp = fixture.componentInstance;
    service = TestBed.inject(TaskCompletionTime2Service);

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
    expect(comp.taskCompletionTime2s?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to taskCompletionTime2Service', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTaskCompletionTime2Identifier');
      const id = comp.trackId(0, entity);
      expect(service.getTaskCompletionTime2Identifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
