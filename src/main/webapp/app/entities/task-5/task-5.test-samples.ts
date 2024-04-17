import { ITask5, NewTask5 } from './task-5.model';

export const sampleWithRequiredData: ITask5 = {
  id: 9593,
  participantName: 'incidentally',
  sex: 'M',
  age: 7001,
};

export const sampleWithPartialData: ITask5 = {
  id: 27382,
  participantName: 'bah',
  sex: 'M',
  age: 12158,
  errors: 15059,
};

export const sampleWithFullData: ITask5 = {
  id: 4796,
  participantName: 'whoa welcome loosely',
  sex: 'F',
  age: 274,
  taskCompletionTimeSeconds: 7942,
  errors: 10130,
};

export const sampleWithNewData: NewTask5 = {
  participantName: 'to lightly',
  sex: 'F',
  age: 19822,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
