import theme from '@/theme/theme';
import { TooltipData } from '@/types/chart';
import { TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { Typography } from 'antd';

interface TooltipProps {
  title: string;
  data: TooltipData[];
  top: number;
  left: number;
  yUnit?: string;
  coloredCircle?: boolean;
  coloredTitle?: boolean;
}

const { Title, Text } = Typography;

const circleSize = theme.sizing.m;

const Tooltip = ({
  title,
  data,
  top,
  left,
  yUnit,
  coloredTitle,
  coloredCircle
}: TooltipProps) => {
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
        <Title
          level={4}
          className="m-0"
          style={
            coloredTitle && data.length === 1 ? { color: data[0].color } : {}
          }
        >
          {title}
        </Title>
        {data.map((d, i) => (
          <div key={i} className="flex flex-row items-center">
            {coloredCircle && (
              <svg width={circleSize} height={circleSize} className="mr-2">
                <circle
                  fill={d.color}
                  r={circleSize / 2}
                  cx={circleSize / 2}
                  cy={circleSize / 2}
                />
              </svg>
            )}
            <Text>{`${d.y}${yUnit ?? ''}`}</Text>
          </div>
        ))}
      </div>
    </TooltipWithBounds>
  );
};

export default Tooltip;
