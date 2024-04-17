import { Sex } from 'app/entities/enumerations/sex.model';

export interface ITask3 {
  id: number;
  participantName?: string | null;
  sex?: keyof typeof Sex | null;
  age?: number | null;
  taskCompletionTimeSeconds?: number | null;
  errors?: number | null;
}

export type NewTask3 = Omit<ITask3, 'id'> & { id: null };
