import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Task5Service } from '../service/task-5.service';

import { Task5Component } from './task-5.component';

describe('Task5 Management Component', () => {
  let comp: Task5Component;
  let fixture: ComponentFixture<Task5Component>;
  let service: Task5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'task-5', component: Task5Component }]), HttpClientTestingModule, Task5Component],
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
      .overrideTemplate(Task5Component, '')
      .compileComponents();

    fixture = TestBed.createComponent(Task5Component);
    comp = fixture.componentInstance;
    service = TestBed.inject(Task5Service);

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
    expect(comp.task5s?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to task5Service', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTask5Identifier');
      const id = comp.trackId(0, entity);
      expect(service.getTask5Identifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
