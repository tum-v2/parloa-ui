'use client';
import { Axis } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { LinearGradient } from '@visx/gradient';
import { LinePath, Line, Bar } from '@visx/shape';
import { curveNatural } from '@visx/curve';
import { AreaClosed } from '@visx/shape';
import theme from '@/theme/theme';
import { useCallback, useMemo } from 'react';
import { localPoint } from '@visx/event';
import { bisector } from 'd3-array';
import { useTooltip } from '@visx/tooltip';
import React from 'react';
import { GlyphCircle } from '@visx/glyph';
import Tooltip from './Tooltip';

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
  tooltipTitle?: string;
}

const chartColors = [theme.color.blue, theme.color.pink, theme.color.orange];

const LineChart = ({
  width,
  height,
  data,
  yMax,
  padding = 50, // Doesn't have to be consistent with our theme
  yUnit,
  tooltipTitle
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

  const bisectXData = useMemo(
    () => bisector<ChartData, number>(d => d.x).left,
    []
  );

  // Tooltip
  const { tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } =
    useTooltip<ChartData[]>();

  // Get tooltip data for all lines at the given x value
  const getData = useCallback(
    (x: number) => {
      const output = data.flatMap(d =>
        d.filter(function (el) {
          return el.x === x;
        })
      );
      return output;
    },
    [data]
  );

  // Tooltip handler
  const handleTooltip = useCallback(
    (event: React.MouseEvent<SVGRectElement>) => {
      // Get x value from mouse event
      const { x } = localPoint(event) || { x: 0 };
      const x0 = scaleX.invert(x);
      const index = bisectXData(data[0], x0, 1);
      const d0 = data[0][index - 1];
      const d1 = data[0][index];
      let d = d0;
      if (d1 && d1.x) {
        d = x0 - d0.x > d1.x - x0 ? d1 : d0;
      }
      showTooltip({
        tooltipData: getData(d.x),
        tooltipLeft: scaleX(d.x),
        tooltipTop: scaleY(d.y)
      });
    },
    [bisectXData, data, getData, scaleX, scaleY, showTooltip]
  );

  return (
    <>
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
            <Bar
              width={width}
              height={height}
              fill="transparent"
              onMouseMove={event => handleTooltip(event)}
              onMouseLeave={hideTooltip}
            />
            {tooltipData && (
              <g>
                <Line
                  from={{ x: tooltipLeft, y: 0 + padding }}
                  to={{ x: tooltipLeft, y: height - padding }}
                  stroke={theme.color.ligthGray}
                  strokeWidth={theme.strokeWidth.s}
                  pointerEvents="none"
                  strokeDasharray="5, 5"
                />
              </g>
            )}
            {tooltipData &&
              tooltipData.map((d, i) => (
                <g key={i}>
                  <GlyphCircle
                    left={tooltipLeft ?? 0}
                    top={scaleY(d.y)}
                    size={theme.sizing.xxl}
                    fill={chartColors[i]}
                    stroke={theme.color.white}
                    strokeWidth={2}
                  />
                </g>
              ))}
          </>
        ))}
      </svg>
      {tooltipData && (
        <Tooltip
          top={(tooltipTop ?? 0) - theme.padding.s}
          left={(tooltipLeft ?? 0) + theme.padding.s}
          title={`${tooltipTitle ? tooltipTitle : 'Conversation'} ${
            tooltipData[0].x
          }`}
          data={tooltipData}
          yUnit={yUnit}
        />
      )}
    </>
  );
};

export default LineChart;
