import { Axis } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { LinePath } from '@visx/shape';
import { curveNatural } from '@visx/curve';
import { AreaClosed } from '@visx/shape';
import theme from '@/theme/theme';

interface ChartData {
  x: number;
  y: number;
}

interface LineChartProps {
  width: number;
  height: number;
  data: ChartData[][];
  xMin: number;
  yMax: number;
  padding?: number;
  hideAxis?: boolean;
  yUnit?: string;
}

const LineChart = ({
  width,
  height,
  data,
  xMin,
  yMax,
  padding = 50,
  yUnit
}: LineChartProps) => {
  const scaleX = scaleLinear({
    domain: [xMin, data[0].length],
    range: [padding, width - padding]
  });

  const scaleY = scaleLinear({
    domain: [0, yMax],
    range: [height - padding, padding]
  });

  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={theme.color.white}
        rx={14}
      />
      <Axis
        scale={scaleX}
        top={height - padding}
        orientation="bottom"
        stroke={theme.color.textDescription}
        hideTicks
        tickLabelProps={() => ({
          fill: theme.color.textDescription,
          fontSize: theme.fontSize,
          textAnchor: 'middle',
          verticalAnchor: 'middle'
        })}
      />
      <Axis
        scale={scaleY}
        left={padding}
        orientation="left"
        stroke={theme.color.textDescription}
        hideTicks
        tickLabelProps={() => ({
          fill: theme.color.textDescription,
          fontSize: theme.fontSize,
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
            from={theme.chartColors[i]}
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
            stroke={theme.chartColors[i]}
            strokeWidth={3}
            curve={curveNatural}
          />
        </>
      ))}
    </svg>
  );
};

export default LineChart;
