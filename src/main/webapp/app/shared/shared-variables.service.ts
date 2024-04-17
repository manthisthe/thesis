import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedVariablesService {
  private activeTaskObservable = new ReplaySubject<string>(1);

  constructor() {}

  public getActiveTaskObservable(): Observable<string> {
    return this.activeTaskObservable;
  }

  public setActiveTaskObservable(activeTask: string): void {
    this.activeTaskObservable.next(activeTask);
  }
}
