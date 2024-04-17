import { Sex } from 'app/entities/enumerations/sex.model';

export interface ITask1Visibility {
  id: number;
  participantName?: string | null;
  sex?: keyof typeof Sex | null;
  age?: number | null;
  timecompletionTimeSeconds?: number | null;
  errors?: number | null;
  taskCompleted?: boolean | null;
}

export type NewTask1Visibility = Omit<ITask1Visibility, 'id'> & { id: null };
