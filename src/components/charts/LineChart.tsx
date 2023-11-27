import { Axis } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { LinePath } from '@visx/shape';
import { curveNatural } from '@visx/curve';
import { AreaClosed } from '@visx/shape';
import theme from '@/theme/theme';
import { useMemo } from 'react';

interface ChartData {
  x: number;
  y: number;
}

interface LineChartProps {
  width: number;
  height: number;
  data: ChartData[][];
  yMax?: number;
  padding?: number;
  hideAxis?: boolean;
  yUnit?: string;
}

const chartColors = [theme.color.blue, theme.color.pink, theme.color.pink];

const LineChart = ({
  width,
  height,
  data,
  yMax,
  padding = 50, // Doesn't have to be consistent with our theme
  yUnit
}: LineChartProps) => {
  // Get min x
  const xMin = useMemo(
    () =>
      Math.min(...data.map(lineData => Math.min(...lineData.map(d => d.x)))),
    [data]
  );

  // Get max x
  const xMax = useMemo(
    () =>
      Math.max(...data.map(lineData => Math.max(...lineData.map(d => d.x)))),
    [data]
  );

  // Get max y if not provided
  yMax = useMemo(
    () =>
      yMax ||
      Math.max(...data.map(lineData => Math.max(...lineData.map(d => d.y)))),
    [data, yMax]
  );

  const scaleX = useMemo(
    () =>
      scaleLinear({
        domain: [xMin, xMax],
        range: [padding, width - padding]
      }),
    [xMin, xMax, padding, width]
  );

  const scaleY = useMemo(
    () =>
      scaleLinear({
        domain: [0, yMax ?? 0],
        range: [height - padding, padding]
      }),
    [yMax, height, padding]
  );

  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={theme.color.white}
      />
      <Axis
        scale={scaleX}
        top={height - padding}
        orientation="bottom"
        stroke={theme.color.ligthGray}
        hideTicks
        tickLabelProps={() => ({
          fill: theme.color.ligthGray,
          fontSize: theme.fontSize.m,
          textAnchor: 'middle',
          verticalAnchor: 'middle'
        })}
        tickValues={data[0].map(d => d.x)} // Only show ticks for x values
        tickFormat={value => `${value}`}
      />
      <Axis
        scale={scaleY}
        left={padding}
        orientation="left"
        stroke={theme.color.ligthGray}
        hideTicks
        tickLabelProps={() => ({
          fill: theme.color.ligthGray,
          fontSize: theme.fontSize.m,
          textAnchor: 'end',
          verticalAnchor: 'middle'
        })}
        tickFormat={yUnit ? value => `${value}${yUnit}` : undefined}
        hideZero
      />
      {data.map((lineData, i) => (
        <>
          <LinearGradient
            key={`background-gradient-${i}`}
            id={`background-gradient-${i}`}
            from={chartColors[i]}
            to={theme.color.white}
            fromOpacity={0.2}
            toOpacity={0.2}
          />
          <AreaClosed
            key={`area-${i}`}
            data={lineData}
            x={d => scaleX(d.x)}
            y={d => scaleY(d.y)}
            yScale={scaleY}
            fill={`url('#background-gradient-${i}')`}
            curve={curveNatural}
          />
          <LinePath
            data={lineData}
            x={d => scaleX(d.x)}
            y={d => scaleY(d.y)}
            stroke={chartColors[i]}
            strokeWidth={theme.strokeWidth.m}
            curve={curveNatural}
          />
        </>
      ))}
    </svg>
  );
};

export default LineChart;
