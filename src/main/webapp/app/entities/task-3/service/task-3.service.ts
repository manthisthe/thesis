import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITask3, NewTask3 } from '../task-3.model';

export type PartialUpdateTask3 = Partial<ITask3> & Pick<ITask3, 'id'>;

export type EntityResponseType = HttpResponse<ITask3>;
export type EntityArrayResponseType = HttpResponse<ITask3[]>;

@Injectable({ providedIn: 'root' })
export class Task3Service {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-3-s');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(task3: NewTask3): Observable<EntityResponseType> {
    return this.http.post<ITask3>(this.resourceUrl, task3, { observe: 'response' });
  }

  update(task3: ITask3): Observable<EntityResponseType> {
    return this.http.put<ITask3>(`${this.resourceUrl}/${this.getTask3Identifier(task3)}`, task3, { observe: 'response' });
  }

  partialUpdate(task3: PartialUpdateTask3): Observable<EntityResponseType> {
    return this.http.patch<ITask3>(`${this.resourceUrl}/${this.getTask3Identifier(task3)}`, task3, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITask3>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITask3[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTask3Identifier(task3: Pick<ITask3, 'id'>): number {
    return task3.id;
  }

  compareTask3(o1: Pick<ITask3, 'id'> | null, o2: Pick<ITask3, 'id'> | null): boolean {
    return o1 && o2 ? this.getTask3Identifier(o1) === this.getTask3Identifier(o2) : o1 === o2;
  }

  addTask3ToCollectionIfMissing<Type extends Pick<ITask3, 'id'>>(
    task3Collection: Type[],
    ...task3sToCheck: (Type | null | undefined)[]
  ): Type[] {
    const task3s: Type[] = task3sToCheck.filter(isPresent);
    if (task3s.length > 0) {
      const task3CollectionIdentifiers = task3Collection.map(task3Item => this.getTask3Identifier(task3Item)!);
      const task3sToAdd = task3s.filter(task3Item => {
        const task3Identifier = this.getTask3Identifier(task3Item);
        if (task3CollectionIdentifiers.includes(task3Identifier)) {
          return false;
        }
        task3CollectionIdentifiers.push(task3Identifier);
        return true;
      });
      return [...task3sToAdd, ...task3Collection];
    }
    return task3Collection;
  }
}
