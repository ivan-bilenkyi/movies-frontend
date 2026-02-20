import { ZodError } from 'zod';

export const getZodErrorMessage = (err: unknown): string => {
  if (err instanceof ZodError) {
    if (err.issues && err.issues.length > 0) {
      return err.issues[0].message;
    }
  }
  return 'Validation error';
};
