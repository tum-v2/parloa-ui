import { Simulation, SimulationSchema } from '@/api/schemas/simulation';
import { useQuery } from '@tanstack/react-query';

const useSimulations = () => {
  // TODO: remove mock
  const mockSimulations = [
    SimulationSchema.parse({
      _id: '123',
      _v: 1,
      user: 'user',
      name: 'Flight Agent Booking',
      scenario: 'Slot Filling',
      domain: 'Domain',
      type: 'Automated',
      numConversations: 3,
      agents: [],
      conversations: [0, 1, 2],
      status: 'OK',
      createdAt: '2023-11-27T12:00:00.000Z',
      updatedAt: '2023-11-27T12:00:00.000Z'
    })
  ];

  const getMockSimulations = async () => {
    await new Promise(r => setTimeout(r, 1000));
    return mockSimulations;
  };

  return useQuery<Simulation[], Error>({
    queryKey: ['simulation'],
    queryFn: () => getMockSimulations()
  });
};

export default useSimulations;
