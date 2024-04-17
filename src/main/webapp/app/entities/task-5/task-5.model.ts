import { Sex } from 'app/entities/enumerations/sex.model';

export interface ITask5 {
  id: number;
  participantName?: string | null;
  sex?: keyof typeof Sex | null;
  age?: number | null;
  taskCompletionTimeSeconds?: number | null;
  errors?: number | null;
}

export type NewTask5 = Omit<ITask5, 'id'> & { id: null };
