import { z } from 'zod';

export const LLMSchema = z.array(z.string());
