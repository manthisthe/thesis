import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITask4, NewTask4 } from '../task-4.model';

export type PartialUpdateTask4 = Partial<ITask4> & Pick<ITask4, 'id'>;

export type EntityResponseType = HttpResponse<ITask4>;
export type EntityArrayResponseType = HttpResponse<ITask4[]>;

@Injectable({ providedIn: 'root' })
export class Task4Service {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-4-s');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(task4: NewTask4): Observable<EntityResponseType> {
    return this.http.post<ITask4>(this.resourceUrl, task4, { observe: 'response' });
  }

  update(task4: ITask4): Observable<EntityResponseType> {
    return this.http.put<ITask4>(`${this.resourceUrl}/${this.getTask4Identifier(task4)}`, task4, { observe: 'response' });
  }

  partialUpdate(task4: PartialUpdateTask4): Observable<EntityResponseType> {
    return this.http.patch<ITask4>(`${this.resourceUrl}/${this.getTask4Identifier(task4)}`, task4, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITask4>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITask4[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTask4Identifier(task4: Pick<ITask4, 'id'>): number {
    return task4.id;
  }

  compareTask4(o1: Pick<ITask4, 'id'> | null, o2: Pick<ITask4, 'id'> | null): boolean {
    return o1 && o2 ? this.getTask4Identifier(o1) === this.getTask4Identifier(o2) : o1 === o2;
  }

  addTask4ToCollectionIfMissing<Type extends Pick<ITask4, 'id'>>(
    task4Collection: Type[],
    ...task4sToCheck: (Type | null | undefined)[]
  ): Type[] {
    const task4s: Type[] = task4sToCheck.filter(isPresent);
    if (task4s.length > 0) {
      const task4CollectionIdentifiers = task4Collection.map(task4Item => this.getTask4Identifier(task4Item)!);
      const task4sToAdd = task4s.filter(task4Item => {
        const task4Identifier = this.getTask4Identifier(task4Item);
        if (task4CollectionIdentifiers.includes(task4Identifier)) {
          return false;
        }
        task4CollectionIdentifiers.push(task4Identifier);
        return true;
      });
      return [...task4sToAdd, ...task4Collection];
    }
    return task4Collection;
  }
}
