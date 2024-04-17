import { Sex } from 'app/entities/enumerations/sex.model';

export interface ITaskCompletionTime2 {
  id: number;
  participantName?: string | null;
  sex?: keyof typeof Sex | null;
  age?: number | null;
  timeSeconds?: number | null;
}

export type NewTaskCompletionTime2 = Omit<ITaskCompletionTime2, 'id'> & { id: null };
