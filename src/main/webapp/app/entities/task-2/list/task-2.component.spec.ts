import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Task2Service } from '../service/task-2.service';

import { Task2Component } from './task-2.component';

describe('Task2 Management Component', () => {
  let comp: Task2Component;
  let fixture: ComponentFixture<Task2Component>;
  let service: Task2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'task-2', component: Task2Component }]), HttpClientTestingModule, Task2Component],
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
      .overrideTemplate(Task2Component, '')
      .compileComponents();

    fixture = TestBed.createComponent(Task2Component);
    comp = fixture.componentInstance;
    service = TestBed.inject(Task2Service);

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
    expect(comp.task2s?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to task2Service', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTask2Identifier');
      const id = comp.trackId(0, entity);
      expect(service.getTask2Identifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
