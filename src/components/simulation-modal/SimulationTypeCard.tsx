import React, { useState, useEffect } from 'react';
import { Card, Flex, Typography } from 'antd';
import theme from '@/theme/theme';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setType } from '@/store/features/CreateSimulation/CreateSimulationSlice';
import { AiFillCode } from 'react-icons/ai';
import { IoReload } from 'react-icons/io5';

const { Text } = Typography;

interface SimulationTypeCardProps {
  title: string;
  children?: React.ReactNode;
  mode: 'manual' | 'automated';
  selectable: boolean;
}

const cardStyleBase: React.CSSProperties = {
  border: '1px solid',
  cursor: 'pointer',
  height: '100%',
  width: '100%',
  minWidth: '200px'
};

const iconAndTextStyle: React.CSSProperties = {
  marginBottom: theme.margin.xs,
  fontSize: theme.fontSize.xl,
  textAlign: 'center'
};

const iconStyle: React.CSSProperties = {
  marginBottom: theme.margin.l
};

const getModeColors = (mode: 'manual' | 'automated') =>
  ({
    manual: {
      iconAndText: theme.color.royalBlue,
      border: theme.color.skyBlue,
      background: theme.color.paleBlue
    },
    automated: {
      iconAndText: theme.color.brightLavender,
      border: theme.color.lilac,
      background: theme.color.paleLavender
    }
  })[mode];

const SimulationTypeCard = ({
  title,
  children,
  mode,
  selectable
}: SimulationTypeCardProps) => {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const modeColors = getModeColors(mode);

  //simulation type state
  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (simulation.type === mode.toUpperCase()) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [simulation.type, mode]);

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

  const CardIcon = () => {
    if (mode === 'manual') {
      return <AiFillCode size={100} />;
    } else {
      return <IoReload size={100} />;
    }
  };

  const handleCardClick = () => {
    if (selectable) {
      if (mode === 'manual') {
        dispatch(setType('MANUAL'));
      } else if (mode === 'automated') {
        dispatch(setType('AUTOMATED'));
      }
    }
    setClicked(!clicked);
  };

  return (
    <Card
      style={cardStyle}
      onMouseEnter={() => selectable && setHover(true)}
      onMouseLeave={() => selectable && setHover(false)}
      onClick={handleCardClick}
      bodyStyle={{ height: '100%' }}
    >
      <Flex justify="center" align="center" className="h-full" vertical>
        <span style={{ ...iconStyle, color: textStyle.color }}>
          <CardIcon />
        </span>
        <Text style={textStyle}>{title}</Text>
        <Text style={textStyle}>Simulation</Text>
        {children}
      </Flex>
    </Card>
  );
};

export default SimulationTypeCard;
