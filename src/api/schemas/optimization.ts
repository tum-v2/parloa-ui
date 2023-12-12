import { z } from 'zod';
import { EvaluationBySimulation } from './evaluation';

export const OptimizationSchema = z.string().array(); // TODO: Update this schema once the optimization API is giving us more information

export type Optimization = z.infer<typeof OptimizationSchema>;

export type OptimizationEvaluation = {
  _id: string;
  evaluation: EvaluationBySimulation;
};
