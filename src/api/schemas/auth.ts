import { z } from 'zod';

export const AuthSchema = z.object({
  succes: z.boolean()
  // TODO: Change this to correct one once API return correct data
});

export type Auth = z.infer<typeof AuthSchema>;
