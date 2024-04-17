import { Sex } from 'app/entities/enumerations/sex.model';

export interface IRevocabilityPasswordChangeTime {
  id: number;
  participantName?: string | null;
  sex?: keyof typeof Sex | null;
  age?: number | null;
  timeSeconds?: number | null;
  errors?: number | null;
}

export type NewRevocabilityPasswordChangeTime = Omit<IRevocabilityPasswordChangeTime, 'id'> & { id: null };
