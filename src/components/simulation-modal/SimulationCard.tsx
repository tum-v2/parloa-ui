import React, { useState } from 'react';
import { Card, Typography } from 'antd';

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
      iconAndText: '#4E77DF',
      border: '#87A9FF',
      background: '#F0F1FF'
    },
    automated: {
      iconAndText: '#BE54DA',
      border: '#E194F5',
      background: '#FDF3FF'
    }
  })[mode];

const SimulationCard: React.FC<SimulationCardProps> = ({
  title,
  icon,
  children,
  mode,
  selectable
}) => {
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
