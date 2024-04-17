import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITask1Visibility, NewTask1Visibility } from '../task-1-visibility.model';

export type PartialUpdateTask1Visibility = Partial<ITask1Visibility> & Pick<ITask1Visibility, 'id'>;

export type EntityResponseType = HttpResponse<ITask1Visibility>;
export type EntityArrayResponseType = HttpResponse<ITask1Visibility[]>;

@Injectable({ providedIn: 'root' })
export class Task1VisibilityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/task-1-visibilities');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(task1Visibility: NewTask1Visibility): Observable<EntityResponseType> {
    return this.http.post<ITask1Visibility>(this.resourceUrl, task1Visibility, { observe: 'response' });
  }

  update(task1Visibility: ITask1Visibility): Observable<EntityResponseType> {
    return this.http.put<ITask1Visibility>(`${this.resourceUrl}/${this.getTask1VisibilityIdentifier(task1Visibility)}`, task1Visibility, {
      observe: 'response',
    });
  }

  partialUpdate(task1Visibility: PartialUpdateTask1Visibility): Observable<EntityResponseType> {
    return this.http.patch<ITask1Visibility>(`${this.resourceUrl}/${this.getTask1VisibilityIdentifier(task1Visibility)}`, task1Visibility, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITask1Visibility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITask1Visibility[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getTask1VisibilityIdentifier(task1Visibility: Pick<ITask1Visibility, 'id'>): number {
    return task1Visibility.id;
  }

  compareTask1Visibility(o1: Pick<ITask1Visibility, 'id'> | null, o2: Pick<ITask1Visibility, 'id'> | null): boolean {
    return o1 && o2 ? this.getTask1VisibilityIdentifier(o1) === this.getTask1VisibilityIdentifier(o2) : o1 === o2;
  }

  addTask1VisibilityToCollectionIfMissing<Type extends Pick<ITask1Visibility, 'id'>>(
    task1VisibilityCollection: Type[],
    ...task1VisibilitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const task1Visibilities: Type[] = task1VisibilitiesToCheck.filter(isPresent);
    if (task1Visibilities.length > 0) {
      const task1VisibilityCollectionIdentifiers = task1VisibilityCollection.map(
        task1VisibilityItem => this.getTask1VisibilityIdentifier(task1VisibilityItem)!,
      );
      const task1VisibilitiesToAdd = task1Visibilities.filter(task1VisibilityItem => {
        const task1VisibilityIdentifier = this.getTask1VisibilityIdentifier(task1VisibilityItem);
        if (task1VisibilityCollectionIdentifiers.includes(task1VisibilityIdentifier)) {
          return false;
        }
        task1VisibilityCollectionIdentifiers.push(task1VisibilityIdentifier);
        return true;
      });
      return [...task1VisibilitiesToAdd, ...task1VisibilityCollection];
    }
    return task1VisibilityCollection;
  }
}
