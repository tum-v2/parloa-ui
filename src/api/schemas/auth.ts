import { z } from 'zod';

export const AuthSchema = z.object({
  succes: z.boolean(),
  token: z.string()
});

export type Auth = z.infer<typeof AuthSchema>;
