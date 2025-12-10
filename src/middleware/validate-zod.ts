import z, { ZodError, ZodType } from 'zod';

// Validate Zod
export const validateZod = (schema: ZodType, values: any) => {
  try {
    return schema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      return z.prettifyError(error);
    }
    return 'Input validation failed';
  }
};
