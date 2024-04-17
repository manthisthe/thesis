import { Sex } from 'app/entities/enumerations/sex.model';

export interface ITaskCompletionTimeSimple {
  id: number;
  participantName?: string | null;
  sex?: keyof typeof Sex | null;
  age?: number | null;
  timeMills?: number | null;
  errors?: number | null;
}

export type NewTaskCompletionTimeSimple = Omit<ITaskCompletionTimeSimple, 'id'> & { id: null };
