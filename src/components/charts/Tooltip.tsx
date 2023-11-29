import theme from '@/theme/theme';
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { Typography } from 'antd';

interface TooltipProps {
  title: string;
  data: ChartData[];
  top: number;
  left: number;
  yUnit?: string;
}

interface ChartData {
  x: number;
  y: number;
}

const { Title, Text } = Typography;

const chartColors = [theme.color.blue, theme.color.pink, theme.color.orange];

const circleSize = theme.sizing.m;

const Tooltip = ({ title, data, top, left, yUnit }: TooltipProps) => {
  return (
    <TooltipWithBounds
      key={Math.random()}
      top={top}
      left={left}
      style={{
        ...defaultStyles,
        padding: theme.padding.m,
        borderRadius: theme.borderRadius.l
      }}
    >
      <div>
        <Title level={4} className="m-0">
          {title}
        </Title>
        {data.map((d, i) => (
          <div key={i} className="flex flex-row items-center">
            <svg width={circleSize} height={circleSize} className="mr-2">
              <circle
                fill={chartColors[i]}
                r={circleSize / 2}
                cx={circleSize / 2}
                cy={circleSize / 2}
              />
            </svg>
            <Text>{`${d.y}${yUnit ?? ''}`}</Text>
          </div>
        ))}
      </div>
    </TooltipWithBounds>
  );
};

export default Tooltip;
