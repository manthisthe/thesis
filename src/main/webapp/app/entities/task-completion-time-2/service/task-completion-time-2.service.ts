import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITaskCompletionTime2, NewTaskCompletionTime2 } from '../task-completion-time-2.model';

export type PartialUpdateTaskCompletionTime2 = Partial<ITaskCompletionTime2> & Pick<ITaskCompletionTime2, 'id'>;

export type EntityResponseType = HttpResponse<ITaskCompletionTime2>;
export type EntityArrayResponseType = HttpResponse<ITaskCompletionTime2[]>;

@Injectable({ providedIn: 'root' })
export class TaskCompletionTime2Service {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-completion-time-2-s');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(taskCompletionTime2: NewTaskCompletionTime2): Observable<EntityResponseType> {
    return this.http.post<ITaskCompletionTime2>(this.resourceUrl, taskCompletionTime2, { observe: 'response' });
  }

  update(taskCompletionTime2: ITaskCompletionTime2): Observable<EntityResponseType> {
    return this.http.put<ITaskCompletionTime2>(
      `${this.resourceUrl}/${this.getTaskCompletionTime2Identifier(taskCompletionTime2)}`,
      taskCompletionTime2,
      { observe: 'response' },
    );
  }

  partialUpdate(taskCompletionTime2: PartialUpdateTaskCompletionTime2): Observable<EntityResponseType> {
    return this.http.patch<ITaskCompletionTime2>(
      `${this.resourceUrl}/${this.getTaskCompletionTime2Identifier(taskCompletionTime2)}`,
      taskCompletionTime2,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaskCompletionTime2>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaskCompletionTime2[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTaskCompletionTime2Identifier(taskCompletionTime2: Pick<ITaskCompletionTime2, 'id'>): number {
    return taskCompletionTime2.id;
  }

  compareTaskCompletionTime2(o1: Pick<ITaskCompletionTime2, 'id'> | null, o2: Pick<ITaskCompletionTime2, 'id'> | null): boolean {
    return o1 && o2 ? this.getTaskCompletionTime2Identifier(o1) === this.getTaskCompletionTime2Identifier(o2) : o1 === o2;
  }

  addTaskCompletionTime2ToCollectionIfMissing<Type extends Pick<ITaskCompletionTime2, 'id'>>(
    taskCompletionTime2Collection: Type[],
    ...taskCompletionTime2sToCheck: (Type | null | undefined)[]
  ): Type[] {
    const taskCompletionTime2s: Type[] = taskCompletionTime2sToCheck.filter(isPresent);
    if (taskCompletionTime2s.length > 0) {
      const taskCompletionTime2CollectionIdentifiers = taskCompletionTime2Collection.map(
        taskCompletionTime2Item => this.getTaskCompletionTime2Identifier(taskCompletionTime2Item)!,
      );
      const taskCompletionTime2sToAdd = taskCompletionTime2s.filter(taskCompletionTime2Item => {
        const taskCompletionTime2Identifier = this.getTaskCompletionTime2Identifier(taskCompletionTime2Item);
        if (taskCompletionTime2CollectionIdentifiers.includes(taskCompletionTime2Identifier)) {
          return false;
        }
        taskCompletionTime2CollectionIdentifiers.push(taskCompletionTime2Identifier);
        return true;
      });
      return [...taskCompletionTime2sToAdd, ...taskCompletionTime2Collection];
    }
    return taskCompletionTime2Collection;
  }
}
