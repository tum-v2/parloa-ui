import { mergeBarChartDatapoints } from '@/lib/charts/chartUtils';
import { BarChartData } from '@/types/chart';

test('mergeBarChartDatapoints should return merged data object', () => {
  const data = [
    {
      key: 'y1',
      dataPoints: [
        {
          x: 1,
          y: 20
        },
        {
          x: 2,
          y: 30
        },
        {
          x: 3,
          y: 40
        }
      ]
    },
    {
      key: 'y2',
      dataPoints: [
        {
          x: 1,
          y: 40
        },
        {
          x: 2,
          y: 50
        },
        {
          x: 3,
          y: 60
        }
      ]
    }
  ];
  const mergedData = [
    {
      x: 1,
      y1: 20,
      y2: 40
    },
    {
      x: 2,
      y1: 30,
      y2: 50
    },
    {
      x: 3,
      y1: 40,
      y2: 60
    }
  ];
  expect(mergeBarChartDatapoints(data)).toEqual(mergedData);
});

test('mergeBarChartDatapoints should return empty array if data is empty', () => {
  const data: BarChartData[] = [];
  expect(mergeBarChartDatapoints(data)).toEqual([]);
});
