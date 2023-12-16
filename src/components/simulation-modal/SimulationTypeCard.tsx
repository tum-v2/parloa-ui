import React, { useState, useEffect } from 'react';
import { Card, Flex, Typography } from 'antd';
import theme from '@/theme/theme';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setType } from '@/store/features/CreateSimulation/CreateSimulationSlice';
import { AiFillCode } from 'react-icons/ai';
import { IoReload } from 'react-icons/io5';

const { Text } = Typography;

export enum SimulationMode {
  CHAT = 'CHAT',
  AUTOMATED = 'AUTOMATED'
  // Add other modes if necessary
}

interface SimulationTypeCardProps {
  title: string;
  children?: React.ReactNode;
  mode: SimulationMode;
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

const getModeColors = (mode: SimulationMode) =>
  ({
    [SimulationMode.CHAT]: {
      iconAndText: theme.color.royalBlue,
      border: theme.color.skyBlue,
      background: theme.color.paleBlue
    },
    [SimulationMode.AUTOMATED]: {
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

  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setClicked(simulation.type === mode.toString());
  }, [simulation.type, mode]);

  const handleCardClick = () => {
    if (selectable) {
      dispatch(setType(mode));
      setClicked(!clicked);
    }
  };

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
    if (mode === SimulationMode.CHAT) {
      return <AiFillCode size={100} />;
    } else {
      return <IoReload size={100} />;
    }
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
