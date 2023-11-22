import BarChart from '@/components/charts/BarChart';

// eslint-disable-next-line require-jsdoc

import NavBar from '@/components/generic/NavBar';

// eslint-disable-next-line require-jsdoc
export default function Page() {
  return (
    <div>
      <NavBar />
      <BarChart
        width={1500}
        height={500}
        data={[
          {
            key: 'Simulation 1',
            dataPoints: [
              { x: 1, y: 20 },
              { x: 2, y: 20 },
              { x: 3, y: 34 },
              { x: 4, y: 56 },
              { x: 5, y: 66 }
            ]
          },
          {
            key: 'Simulation 2',
            dataPoints: [
              { x: 1, y: 40 },
              { x: 2, y: 55 },
              { x: 3, y: 20 },
              { x: 4, y: 67 },
              { x: 5, y: 54 }
            ]
          },
          {
            key: 'Simulation 3',
            dataPoints: [
              { x: 1, y: 40 },
              { x: 2, y: 55 },
              { x: 3, y: 20 },
              { x: 4, y: 67 },
              { x: 5, y: 130 }
            ]
          }
        ]}
      />
    </div>
  );
}
