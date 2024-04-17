import { Sex } from 'app/entities/enumerations/sex.model';

export interface ITask2 {
  id: number;
  participantName?: string | null;
  sex?: keyof typeof Sex | null;
  age?: number | null;
  taskCompletionTimeSeconds?: number | null;
  errors?: number | null;
}

export type NewTask2 = Omit<ITask2, 'id'> & { id: null };
