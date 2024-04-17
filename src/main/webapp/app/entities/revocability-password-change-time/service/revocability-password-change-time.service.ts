import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRevocabilityPasswordChangeTime, NewRevocabilityPasswordChangeTime } from '../revocability-password-change-time.model';

export type PartialUpdateRevocabilityPasswordChangeTime = Partial<IRevocabilityPasswordChangeTime> &
  Pick<IRevocabilityPasswordChangeTime, 'id'>;

export type EntityResponseType = HttpResponse<IRevocabilityPasswordChangeTime>;
export type EntityArrayResponseType = HttpResponse<IRevocabilityPasswordChangeTime[]>;

@Injectable({ providedIn: 'root' })
export class RevocabilityPasswordChangeTimeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/revocability-password-change-times');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(revocabilityPasswordChangeTime: NewRevocabilityPasswordChangeTime): Observable<EntityResponseType> {
    return this.http.post<IRevocabilityPasswordChangeTime>(this.resourceUrl, revocabilityPasswordChangeTime, { observe: 'response' });
  }

  update(revocabilityPasswordChangeTime: IRevocabilityPasswordChangeTime): Observable<EntityResponseType> {
    return this.http.put<IRevocabilityPasswordChangeTime>(
      `${this.resourceUrl}/${this.getRevocabilityPasswordChangeTimeIdentifier(revocabilityPasswordChangeTime)}`,
      revocabilityPasswordChangeTime,
      { observe: 'response' },
    );
  }

  partialUpdate(revocabilityPasswordChangeTime: PartialUpdateRevocabilityPasswordChangeTime): Observable<EntityResponseType> {
    return this.http.patch<IRevocabilityPasswordChangeTime>(
      `${this.resourceUrl}/${this.getRevocabilityPasswordChangeTimeIdentifier(revocabilityPasswordChangeTime)}`,
      revocabilityPasswordChangeTime,
      { observe: 'response' },
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRevocabilityPasswordChangeTime>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRevocabilityPasswordChangeTime[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRevocabilityPasswordChangeTimeIdentifier(revocabilityPasswordChangeTime: Pick<IRevocabilityPasswordChangeTime, 'id'>): number {
    return revocabilityPasswordChangeTime.id;
  }

  compareRevocabilityPasswordChangeTime(
    o1: Pick<IRevocabilityPasswordChangeTime, 'id'> | null,
    o2: Pick<IRevocabilityPasswordChangeTime, 'id'> | null,
  ): boolean {
    return o1 && o2
      ? this.getRevocabilityPasswordChangeTimeIdentifier(o1) === this.getRevocabilityPasswordChangeTimeIdentifier(o2)
      : o1 === o2;
  }

  addRevocabilityPasswordChangeTimeToCollectionIfMissing<Type extends Pick<IRevocabilityPasswordChangeTime, 'id'>>(
    revocabilityPasswordChangeTimeCollection: Type[],
    ...revocabilityPasswordChangeTimesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const revocabilityPasswordChangeTimes: Type[] = revocabilityPasswordChangeTimesToCheck.filter(isPresent);
    if (revocabilityPasswordChangeTimes.length > 0) {
      const revocabilityPasswordChangeTimeCollectionIdentifiers = revocabilityPasswordChangeTimeCollection.map(
        revocabilityPasswordChangeTimeItem => this.getRevocabilityPasswordChangeTimeIdentifier(revocabilityPasswordChangeTimeItem)!,
      );
      const revocabilityPasswordChangeTimesToAdd = revocabilityPasswordChangeTimes.filter(revocabilityPasswordChangeTimeItem => {
        const revocabilityPasswordChangeTimeIdentifier =
          this.getRevocabilityPasswordChangeTimeIdentifier(revocabilityPasswordChangeTimeItem);
        if (revocabilityPasswordChangeTimeCollectionIdentifiers.includes(revocabilityPasswordChangeTimeIdentifier)) {
          return false;
        }
        revocabilityPasswordChangeTimeCollectionIdentifiers.push(revocabilityPasswordChangeTimeIdentifier);
        return true;
      });
      return [...revocabilityPasswordChangeTimesToAdd, ...revocabilityPasswordChangeTimeCollection];
    }
    return revocabilityPasswordChangeTimeCollection;
  }
}
