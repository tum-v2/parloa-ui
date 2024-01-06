import { z } from 'zod';

export const PromptPartSchema = z.object({
  name: z.string(),
  content: z.string()
});

export const PromptsSchema = PromptPartSchema.array();

export type PromptPart = z.infer<typeof PromptPartSchema>;

export type Prompts = z.infer<typeof PromptsSchema>;
