import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITask5, NewTask5 } from '../task-5.model';

export type PartialUpdateTask5 = Partial<ITask5> & Pick<ITask5, 'id'>;

export type EntityResponseType = HttpResponse<ITask5>;
export type EntityArrayResponseType = HttpResponse<ITask5[]>;

@Injectable({ providedIn: 'root' })
export class Task5Service {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-5-s');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(task5: NewTask5): Observable<EntityResponseType> {
    return this.http.post<ITask5>(this.resourceUrl, task5, { observe: 'response' });
  }

  update(task5: ITask5): Observable<EntityResponseType> {
    return this.http.put<ITask5>(`${this.resourceUrl}/${this.getTask5Identifier(task5)}`, task5, { observe: 'response' });
  }

  partialUpdate(task5: PartialUpdateTask5): Observable<EntityResponseType> {
    return this.http.patch<ITask5>(`${this.resourceUrl}/${this.getTask5Identifier(task5)}`, task5, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITask5>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITask5[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTask5Identifier(task5: Pick<ITask5, 'id'>): number {
    return task5.id;
  }

  compareTask5(o1: Pick<ITask5, 'id'> | null, o2: Pick<ITask5, 'id'> | null): boolean {
    return o1 && o2 ? this.getTask5Identifier(o1) === this.getTask5Identifier(o2) : o1 === o2;
  }

  addTask5ToCollectionIfMissing<Type extends Pick<ITask5, 'id'>>(
    task5Collection: Type[],
    ...task5sToCheck: (Type | null | undefined)[]
  ): Type[] {
    const task5s: Type[] = task5sToCheck.filter(isPresent);
    if (task5s.length > 0) {
      const task5CollectionIdentifiers = task5Collection.map(task5Item => this.getTask5Identifier(task5Item)!);
      const task5sToAdd = task5s.filter(task5Item => {
        const task5Identifier = this.getTask5Identifier(task5Item);
        if (task5CollectionIdentifiers.includes(task5Identifier)) {
          return false;
        }
        task5CollectionIdentifiers.push(task5Identifier);
        return true;
      });
      return [...task5sToAdd, ...task5Collection];
    }
    return task5Collection;
  }
}
