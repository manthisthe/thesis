import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITask2, NewTask2 } from '../task-2.model';

export type PartialUpdateTask2 = Partial<ITask2> & Pick<ITask2, 'id'>;

export type EntityResponseType = HttpResponse<ITask2>;
export type EntityArrayResponseType = HttpResponse<ITask2[]>;

@Injectable({ providedIn: 'root' })
export class Task2Service {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-2-s');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(task2: NewTask2): Observable<EntityResponseType> {
    return this.http.post<ITask2>(this.resourceUrl, task2, { observe: 'response' });
  }

  update(task2: ITask2): Observable<EntityResponseType> {
    return this.http.put<ITask2>(`${this.resourceUrl}/${this.getTask2Identifier(task2)}`, task2, { observe: 'response' });
  }

  partialUpdate(task2: PartialUpdateTask2): Observable<EntityResponseType> {
    return this.http.patch<ITask2>(`${this.resourceUrl}/${this.getTask2Identifier(task2)}`, task2, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITask2>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITask2[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTask2Identifier(task2: Pick<ITask2, 'id'>): number {
    return task2.id;
  }

  compareTask2(o1: Pick<ITask2, 'id'> | null, o2: Pick<ITask2, 'id'> | null): boolean {
    return o1 && o2 ? this.getTask2Identifier(o1) === this.getTask2Identifier(o2) : o1 === o2;
  }

  addTask2ToCollectionIfMissing<Type extends Pick<ITask2, 'id'>>(
    task2Collection: Type[],
    ...task2sToCheck: (Type | null | undefined)[]
  ): Type[] {
    const task2s: Type[] = task2sToCheck.filter(isPresent);
    if (task2s.length > 0) {
      const task2CollectionIdentifiers = task2Collection.map(task2Item => this.getTask2Identifier(task2Item)!);
      const task2sToAdd = task2s.filter(task2Item => {
        const task2Identifier = this.getTask2Identifier(task2Item);
        if (task2CollectionIdentifiers.includes(task2Identifier)) {
          return false;
        }
        task2CollectionIdentifiers.push(task2Identifier);
        return true;
      });
      return [...task2sToAdd, ...task2Collection];
    }
    return task2Collection;
  }
}
