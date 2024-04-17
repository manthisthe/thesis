import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { Task3Service } from '../service/task-3.service';

import { Task3Component } from './task-3.component';

describe('Task3 Management Component', () => {
  let comp: Task3Component;
  let fixture: ComponentFixture<Task3Component>;
  let service: Task3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'task-3', component: Task3Component }]), HttpClientTestingModule, Task3Component],
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
      .overrideTemplate(Task3Component, '')
      .compileComponents();

    fixture = TestBed.createComponent(Task3Component);
    comp = fixture.componentInstance;
    service = TestBed.inject(Task3Service);

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
    expect(comp.task3s?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to task3Service', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getTask3Identifier');
      const id = comp.trackId(0, entity);
      expect(service.getTask3Identifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
