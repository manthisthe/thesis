import { ITaskCompletionTime2, NewTaskCompletionTime2 } from './task-completion-time-2.model';

export const sampleWithRequiredData: ITaskCompletionTime2 = {
  id: 494,
};

export const sampleWithPartialData: ITaskCompletionTime2 = {
  id: 30290,
  participantName: 'worth',
  sex: 'M',
  age: 11957,
};

export const sampleWithFullData: ITaskCompletionTime2 = {
  id: 12249,
  participantName: 'legacy',
  sex: 'M',
  age: 14389,
  timeSeconds: 20966,
};

export const sampleWithNewData: NewTaskCompletionTime2 = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
