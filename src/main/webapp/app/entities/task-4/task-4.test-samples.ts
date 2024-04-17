import { ITask4, NewTask4 } from './task-4.model';

export const sampleWithRequiredData: ITask4 = {
  id: 11642,
  participantName: 'goggle oversell',
  sex: 'M',
  age: 14097,
};

export const sampleWithPartialData: ITask4 = {
  id: 20435,
  participantName: 'amongst battle hourly',
  sex: 'M',
  age: 3471,
};

export const sampleWithFullData: ITask4 = {
  id: 14564,
  participantName: 'jam-packed inside tense',
  sex: 'M',
  age: 9999,
  taskCompletionTimeSeconds: 29919,
  errors: 23016,
};

export const sampleWithNewData: NewTask4 = {
  participantName: 'noxious sulk than',
  sex: 'F',
  age: 24019,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
