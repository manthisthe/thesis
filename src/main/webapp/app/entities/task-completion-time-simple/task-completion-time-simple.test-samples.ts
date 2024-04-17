import { ITaskCompletionTimeSimple, NewTaskCompletionTimeSimple } from './task-completion-time-simple.model';

export const sampleWithRequiredData: ITaskCompletionTimeSimple = {
  id: 15387,
};

export const sampleWithPartialData: ITaskCompletionTimeSimple = {
  id: 31976,
  participantName: 'prattle',
  age: 16887,
  errors: 20598,
};

export const sampleWithFullData: ITaskCompletionTimeSimple = {
  id: 19430,
  participantName: 'ick',
  sex: 'F',
  age: 30951,
  timeMills: 20125,
  errors: 12277,
};

export const sampleWithNewData: NewTaskCompletionTimeSimple = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
