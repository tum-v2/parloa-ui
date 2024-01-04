'use client';
import React, { useMemo } from 'react';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarGroup } from '@visx/shape';
import theme from '@/theme/theme';
import { mergeBarChartDatapoints } from '@/lib/charts/chartUtils';
import { BarChartData, MergedDatapoint, TooltipData } from '@/types/chart';
import { useTooltip } from '@visx/tooltip';
import Tooltip from './Tooltip';
import { GridRows } from '@visx/grid';

interface BarChartProps {
  width: number;
  height: number;
  padding?: number;
  data: BarChartData[];
  yUnit?: string;
}

const chartColors = [theme.color.blue, theme.color.pink, theme.color.orange];

const BarChart = ({
  width,
  height,
  padding = 50,
  data,
  yUnit
}: BarChartProps) => {
  // bounds
  const xMax = width - padding * 2;
  const yMax = height - padding * 2;

  // accessors
  const getXData = (d: MergedDatapoint) => d.x;

  const keys = data.map(d => d.key);

  const mergedData = useMemo(() => {
    return mergeBarChartDatapoints(data);
  }, [data]);

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<number>({
        domain: mergedData.map(getXData),
        padding: 0.2
      }),
    [mergedData]
  );

  const keysScale = useMemo(
    () =>
      scaleBand<string>({
        domain: keys,
        padding: 0.1
      }),
    [keys]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [
          0,
          Math.max(
            ...mergedData.map(d => Math.max(...keys.map(key => Number(d[key]))))
          )
        ]
      }),
    [keys, mergedData]
  );

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: chartColors
  });

  // update scale output dimensions
  xScale.rangeRound([0, xMax]);
  keysScale.rangeRound([0, xScale.bandwidth()]);
  yScale.range([yMax, 0]);

  // Use tooltip to show the value of the bar
  const { tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } =
    useTooltip<TooltipData[]>();

  return (
    <>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill={theme.color.white} />
        <AxisLeft
          top={padding}
          left={padding}
          scale={yScale}
          stroke={theme.color.ligthGray}
          hideTicks
          hideZero
          tickLabelProps={{
            fill: theme.color.ligthGray,
            fontSize: theme.fontSize.m,
            textAnchor: 'end'
          }}
          hideAxisLine
          tickValues={yScale.ticks().filter(Number.isInteger)} // Only show integer values
          tickFormat={d => d.toString()} // Avoid .0 values
        />
        <AxisBottom
          top={yMax + padding}
          left={padding}
          scale={xScale}
          stroke={theme.color.ligthGray}
          hideTicks
          hideAxisLine
          tickLabelProps={{
            fill: theme.color.ligthGray,
            fontSize: theme.fontSize.m,
            textAnchor: 'middle'
          }}
        />
        <GridRows
          scale={yScale}
          width={width - padding * 2}
          left={padding}
          top={padding}
          stroke={theme.color.veryLightGray}
          numTicks={5}
          tickValues={yScale.ticks().filter(Number.isInteger)} // Only show integer values
        />
        <Group top={padding} left={padding}>
          <BarGroup
            data={mergedData}
            keys={keys}
            height={yMax}
            x0={getXData}
            x0Scale={xScale}
            x1Scale={keysScale}
            yScale={yScale}
            color={colorScale}
          >
            {barGroups =>
              barGroups.map(barGroup => (
                <Group
                  key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                  left={barGroup.x0}
                >
                  {barGroup.bars.map(bar => (
                    <rect
                      key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      rx={theme.borderRadius.s}
                      onMouseLeave={() => hideTooltip()}
                      onMouseMove={() => {
                        const top = bar.y + padding;
                        const left =
                          barGroup.x0 + bar.width * (bar.index + 1) + padding;
                        showTooltip({
                          tooltipData: [
                            {
                              x: barGroup.index + 1,
                              y: bar.value,
                              color: bar.color
                            }
                          ],
                          tooltipLeft: left,
                          tooltipTop: top
                        });
                      }}
                    />
                  ))}
                </Group>
              ))
            }
          </BarGroup>
        </Group>
      </svg>
      {tooltipData && (
        <Tooltip
          top={(tooltipTop ?? 0) - theme.padding.s}
          left={(tooltipLeft ?? 0) + theme.padding.s}
          title={`Conversation ${tooltipData[0].x}`}
          data={tooltipData}
          coloredTitle
          yUnit={yUnit}
        />
      )}
    </>
  );
};

export default BarChart;
