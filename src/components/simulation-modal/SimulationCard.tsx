import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import theme from '@/theme/theme';

const { Text } = Typography;

interface SimulationCardProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  mode: 'manual' | 'automated';
  selectable: boolean;
}

const cardStyleBase: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 300,
  height: 400,
  border: '1px solid',
  cursor: 'pointer'
};

const iconAndTextStyle: React.CSSProperties = {
  fontWeight: 'normal',
  marginBottom: '4px',
  fontSize: '22px',
  textAlign: 'center'
};

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
};

const iconStyle: React.CSSProperties = {
  marginBottom: '24px'
};

const getModeColors = (mode: 'manual' | 'automated') =>
  ({
    manual: {
      iconAndText: theme.color.royalBlue,
      border: theme.color.skyeBlue,
      background: theme.color.paleBlue
    },
    automated: {
      iconAndText: theme.color.brightLavender,
      border: theme.color.lilac,
      background: theme.color.paleLavender
    }
  })[mode];

const SimulationCard = ({
  title,
  icon,
  children,
  mode,
  selectable
}: SimulationCardProps) => {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const modeColors = getModeColors(mode);

  const cardStyle = {
    ...cardStyleBase,
    borderColor: selectable
      ? hover || clicked
        ? modeColors.border
        : undefined
      : modeColors.border,
    backgroundColor: selectable
      ? hover || clicked
        ? modeColors.background
        : undefined
      : modeColors.background
  };

  const textStyle = {
    ...iconAndTextStyle,
    color: selectable
      ? hover || clicked
        ? modeColors.iconAndText
        : undefined
      : modeColors.iconAndText
  };

  const handleCardClick = () => {
    setClicked(!clicked);
  };

  return (
    <Card
      style={cardStyle}
      onMouseEnter={() => selectable && setHover(true)}
      onMouseLeave={() => selectable && setHover(false)}
      onClick={handleCardClick}
    >
      <div style={wrapperStyle}>
        <span style={{ ...iconStyle, color: textStyle.color }}>{icon}</span>
        <Text style={textStyle}>{title}</Text>
        <Text style={textStyle}>Simulation</Text>
        {children}
      </div>
    </Card>
  );
};

export default SimulationCard;
