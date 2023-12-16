import { z } from 'zod';

export const DashboardSchema = z.object({
  interactions: z.number(),
  simulationRuns: z.number(),
  successRate: z.number(),
  simulationSuccessGraph: z.array(
    z.object({
      id: z.string(),
      successRate: z.number(),
      date: z.number()
    })
  ),
  top10Simulations: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      createdAt: z.string(),
      successRate: z.number(),
      domain: z.string()
    })
  )
});

export type Dashboard = z.infer<typeof DashboardSchema>;
