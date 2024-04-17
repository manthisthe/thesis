import { ITask3, NewTask3 } from './task-3.model';

export const sampleWithRequiredData: ITask3 = {
  id: 13615,
  participantName: 'ah',
  sex: 'M',
  age: 30671,
};

export const sampleWithPartialData: ITask3 = {
  id: 21192,
  participantName: 'mmm radio',
  sex: 'F',
  age: 25199,
  taskCompletionTimeSeconds: 29200,
  errors: 21595,
};

export const sampleWithFullData: ITask3 = {
  id: 2998,
  participantName: 'jubilant nor',
  sex: 'M',
  age: 25721,
  taskCompletionTimeSeconds: 6532,
  errors: 29104,
};

export const sampleWithNewData: NewTask3 = {
  participantName: 'around',
  sex: 'M',
  age: 17239,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
