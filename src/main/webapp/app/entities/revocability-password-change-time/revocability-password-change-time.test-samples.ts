import { IRevocabilityPasswordChangeTime, NewRevocabilityPasswordChangeTime } from './revocability-password-change-time.model';

export const sampleWithRequiredData: IRevocabilityPasswordChangeTime = {
  id: 11699,
};

export const sampleWithPartialData: IRevocabilityPasswordChangeTime = {
  id: 32303,
  age: 22911,
};

export const sampleWithFullData: IRevocabilityPasswordChangeTime = {
  id: 24855,
  participantName: 'atop',
  sex: 'F',
  age: 32001,
  timeSeconds: 25304,
  errors: 24521,
};

export const sampleWithNewData: NewRevocabilityPasswordChangeTime = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
