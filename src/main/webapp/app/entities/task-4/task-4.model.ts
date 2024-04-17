import { Sex } from 'app/entities/enumerations/sex.model';

export interface ITask4 {
  id: number;
  participantName?: string | null;
  sex?: keyof typeof Sex | null;
  age?: number | null;
  taskCompletionTimeSeconds?: number | null;
  errors?: number | null;
}

export type NewTask4 = Omit<ITask4, 'id'> & { id: null };
