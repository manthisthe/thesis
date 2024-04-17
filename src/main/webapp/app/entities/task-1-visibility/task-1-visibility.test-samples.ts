import { ITask1Visibility, NewTask1Visibility } from './task-1-visibility.model';

export const sampleWithRequiredData: ITask1Visibility = {
  id: 17761,
  participantName: 'amid floodplain out',
  sex: 'F',
  age: 31486,
};

export const sampleWithPartialData: ITask1Visibility = {
  id: 4096,
  participantName: 'pin',
  sex: 'M',
  age: 21912,
  errors: 11067,
};

export const sampleWithFullData: ITask1Visibility = {
  id: 30870,
  participantName: 'to',
  sex: 'M',
  age: 14956,
  timecompletionTimeSeconds: 26726,
  errors: 13916,
  taskCompleted: false,
};

export const sampleWithNewData: NewTask1Visibility = {
  participantName: 'opposite',
  sex: 'F',
  age: 11260,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
