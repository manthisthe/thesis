import { ITask2, NewTask2 } from './task-2.model';

export const sampleWithRequiredData: ITask2 = {
  id: 17326,
  participantName: 'office blab',
  sex: 'M',
  age: 9885,
};

export const sampleWithPartialData: ITask2 = {
  id: 1707,
  participantName: 'flower ouch helpless',
  sex: 'M',
  age: 30847,
  errors: 4907,
};

export const sampleWithFullData: ITask2 = {
  id: 8486,
  participantName: 'jump whenever',
  sex: 'M',
  age: 14674,
  taskCompletionTimeSeconds: 18105,
  errors: 28136,
};

export const sampleWithNewData: NewTask2 = {
  participantName: 'even',
  sex: 'M',
  age: 27426,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
