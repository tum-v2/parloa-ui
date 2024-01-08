import { z } from 'zod';

export const GoalSchema = z.object({
  _id: z.string(),
  __v: z.number(),
  name: z.string(),
  description: z.string(),
  scenarios: z.array(z.string()),
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime()
});

export const CreateGoalSchema = z.object({
  name: z.string(),
  description: z.string(),
  scenarios: z.array(z.string())
});

export type Goal = z.infer<typeof GoalSchema>;

export type CreateGoal = z.infer<typeof CreateGoalSchema>;
