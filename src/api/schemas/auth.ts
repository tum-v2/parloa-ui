import { z } from 'zod';

export const AuthSchema = z.object({
  succes: z.boolean()
});

export type Auth = z.infer<typeof AuthSchema>;
