import { z } from 'zod';
import { EvaluationBySimulation } from './evaluation';

export const OptimizationSchema = z.string().array(); // TODO: Update this schema once the optimization API is giving us more information

export const CreateOptimizationResponseSchema = z.object({
  baseSimulation: z.string(),
  simulations: z.string().array(),
  _id: z.string(),
  __v: z.number().optional()
});

export type Optimization = z.infer<typeof OptimizationSchema>;

export type OptimizationEvaluation = {
  _id: string;
  evaluation: EvaluationBySimulation;
};

export type CreateOptimizationResponse = z.infer<
  typeof CreateOptimizationResponseSchema
>;
