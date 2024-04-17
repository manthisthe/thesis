import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaskCompletionTimeSimple, NewTaskCompletionTimeSimple } from '../task-completion-time-simple.model';

export type PartialUpdateTaskCompletionTimeSimple = Partial<ITaskCompletionTimeSimple> & Pick<ITaskCompletionTimeSimple, 'id'>;

export type EntityResponseType = HttpResponse<ITaskCompletionTimeSimple>;
export type EntityArrayResponseType = HttpResponse<ITaskCompletionTimeSimple[]>;

@Injectable({ providedIn: 'root' })
export class TaskCompletionTimeSimpleService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-completion-time-simples');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(taskCompletionTimeSimple: NewTaskCompletionTimeSimple): Observable<EntityResponseType> {
    return this.http.post<ITaskCompletionTimeSimple>(this.resourceUrl, taskCompletionTimeSimple, { observe: 'response' });
  }

  update(taskCompletionTimeSimple: ITaskCompletionTimeSimple): Observable<EntityResponseType> {
    return this.http.put<ITaskCompletionTimeSimple>(
      `${this.resourceUrl}/${this.getTaskCompletionTimeSimpleIdentifier(taskCompletionTimeSimple)}`,
      taskCompletionTimeSimple,
      { observe: 'response' },
    );
  }

  partialUpdate(taskCompletionTimeSimple: PartialUpdateTaskCompletionTimeSimple): Observable<EntityResponseType> {
    return this.http.patch<ITaskCompletionTimeSimple>(
      `${this.resourceUrl}/${this.getTaskCompletionTimeSimpleIdentifier(taskCompletionTimeSimple)}`,
      taskCompletionTimeSimple,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskCompletionTimeSimple>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskCompletionTimeSimple[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaskCompletionTimeSimpleIdentifier(taskCompletionTimeSimple: Pick<ITaskCompletionTimeSimple, 'id'>): number {
    return taskCompletionTimeSimple.id;
  }

  compareTaskCompletionTimeSimple(
    o1: Pick<ITaskCompletionTimeSimple, 'id'> | null,
    o2: Pick<ITaskCompletionTimeSimple, 'id'> | null,
  ): boolean {
    return o1 && o2 ? this.getTaskCompletionTimeSimpleIdentifier(o1) === this.getTaskCompletionTimeSimpleIdentifier(o2) : o1 === o2;
  }

  addTaskCompletionTimeSimpleToCollectionIfMissing<Type extends Pick<ITaskCompletionTimeSimple, 'id'>>(
    taskCompletionTimeSimpleCollection: Type[],
    ...taskCompletionTimeSimplesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taskCompletionTimeSimples: Type[] = taskCompletionTimeSimplesToCheck.filter(isPresent);
    if (taskCompletionTimeSimples.length > 0) {
      const taskCompletionTimeSimpleCollectionIdentifiers = taskCompletionTimeSimpleCollection.map(
        taskCompletionTimeSimpleItem => this.getTaskCompletionTimeSimpleIdentifier(taskCompletionTimeSimpleItem)!,
      );
      const taskCompletionTimeSimplesToAdd = taskCompletionTimeSimples.filter(taskCompletionTimeSimpleItem => {
        const taskCompletionTimeSimpleIdentifier = this.getTaskCompletionTimeSimpleIdentifier(taskCompletionTimeSimpleItem);
        if (taskCompletionTimeSimpleCollectionIdentifiers.includes(taskCompletionTimeSimpleIdentifier)) {
          return false;
        }
        taskCompletionTimeSimpleCollectionIdentifiers.push(taskCompletionTimeSimpleIdentifier);
        return true;
      });
      return [...taskCompletionTimeSimplesToAdd, ...taskCompletionTimeSimpleCollection];
    }
    return taskCompletionTimeSimpleCollection;
  }
}
