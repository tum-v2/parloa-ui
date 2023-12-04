import { z } from 'zod';

export const EvaluationMetric = z.object({
  name: z.string(),
  value: z.number(),
  rawValue: z.number(),
  weight: z.number()
});

export const ConversationEvaluationBySimulation = z.object({
  conversation: z.string(),
  score: z.number(),
  metrics: z.array(EvaluationMetric)
});

export const EvaluationBySimulation = z.object({
  averageScore: z.number(),
  conversations: z.array(ConversationEvaluationBySimulation)
});

export type EvaluationMetric = z.infer<typeof EvaluationMetric>;

export type ConversationEvaluationBySimulation = z.infer<
  typeof ConversationEvaluationBySimulation
>;

export type EvaluationBySimulation = z.infer<typeof EvaluationBySimulation>;
