import { z } from 'zod';
import { SimulationSchema } from '@/api/schemas/simulation';

export const DashboardSchema = z.object({
  interactions: z.number(),
  simulationRuns: z.number(),
  successRate: z.number(),
  simulationSuccessGraph: z.array(
    z.object({
      _id: z.string(),
      successRate: z.number()
    })
  ),
  top10Simulations: z.array(SimulationSchema)
});

export type Dashboard = z.infer<typeof DashboardSchema>;
