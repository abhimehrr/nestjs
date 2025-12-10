import { z } from 'zod';

// ENV MODE
const ENV_MODE = ['development', 'production'];

// Env Validation Schema
export const envValidationSchema = z
  .object({
    // System
    PORT: z
      .string()
      .default('3000')
      .transform((port) => Number(port)),
    NODE_ENV: z
      .string()
      .default('development')
      .refine((env) => ENV_MODE.includes(env), {
        message: 'Invalid environment mode',
      }),

    // Cors: Allowed Origins (comma separated)
    CORS_ALLOWED_ORIGINS: z
      .string()
      .min(1)
      .transform((origins) =>
        origins.split(',').map((origin) => origin.trim()),
      ),
  })
  .transform((data) => {
    return {
      SYSTEM: {
        PORT: data.PORT,
        NODE_ENV: data.NODE_ENV,
      },
      CORS: {
        ALLOWED_ORIGINS: data.CORS_ALLOWED_ORIGINS,
      },
    };
  });

// Env Type (use z.output to get the transformed type)
export type EnvType = z.output<typeof envValidationSchema>;

// Validated ENV
export const ENV = envValidationSchema.parse(process.env);
