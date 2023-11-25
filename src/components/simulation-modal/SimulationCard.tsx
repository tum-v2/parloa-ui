import React from 'react';
import { Card } from 'antd';
import { AiFillCode } from 'react-icons/ai';
import { IoReload } from 'react-icons/io5';
import { Typography } from 'antd';

const { Text } = Typography;

// Define a type for the component props
type SimulationCardProps = {
  mode: 'automated' | 'manual';
  onClick: () => void; // This prop is a function that will be called on card click
};

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 300,
  height: 400,
  border: '1px solid'
};

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: '100%'
};

const iconStyle: React.CSSProperties = {
  marginBottom: '24px'
};

const textStyle: React.CSSProperties = {
  fontWeight: 'normal',
  marginBottom: '4px',
  fontSize: '22px'
};

const SimulationCard: React.FC<SimulationCardProps> = ({ mode, onClick }) => (
  <Card hoverable style={cardStyle} onClick={onClick}>
    <div style={wrapperStyle}>
      {mode === 'manual' ? (
        <>
          <div style={iconStyle}>
            <IoReload size={100} />
          </div>
          <Text style={textStyle}>Manual</Text>
          <Text style={textStyle}>Simulation</Text>
        </>
      ) : (
        <>
          <div style={iconStyle}>
            <AiFillCode size={100} />
          </div>
          <Text style={textStyle}>Automated</Text>
          <Text style={textStyle}>Simulation</Text>
        </>
      )}
    </div>
  </Card>
);

export default SimulationCard;
