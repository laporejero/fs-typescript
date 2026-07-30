import { NewEntrySchema, type NewDiaryEntry } from './types.ts';

export const parseNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return NewEntrySchema.parse(object);
};