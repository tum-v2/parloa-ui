import { z } from 'zod';

export const PromptPartSchema = z.object({
  name: z.string(),
  content: z.string()
});

export type PromptPart = z.infer<typeof PromptPartSchema>;

export const PromptSchema = PromptPartSchema.array();

export type Prompts = z.infer<typeof PromptSchema>;
