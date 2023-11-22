import BarChart from '@/components/charts/BarChart';

// eslint-disable-next-line require-jsdoc
export default function Page() {
  return (
    <BarChart
      width={500}
      height={500}
      data={[
        {
          key: 'Simulation 1',
          dataPoints: [
            { x: 1, y: 20 },
            { x: 2, y: 20 },
            { x: 3, y: 34 },
            { x: 4, y: 56 }
          ]
        },
        {
          key: 'Simulation 2',
          dataPoints: [
            { x: 1, y: 40 },
            { x: 2, y: 55 },
            { x: 3, y: 20 },
            { x: 4, y: 67 }
          ]
        },
        {
          key: 'Simulation 3',
          dataPoints: [
            { x: 1, y: 40 },
            { x: 2, y: 55 },
            { x: 3, y: 20 },
            { x: 4, y: 67 }
          ]
        }
      ]}
    />
  );
}
