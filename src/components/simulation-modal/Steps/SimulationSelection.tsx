import React from 'react';
import SimulationTypeCard from '../SimulationTypeCard';
import { SimulationMode } from '../SimulationTypeCard';
import { Flex } from 'antd';

const SimulationSelection = () => {
  return (
    <Flex className="w-full h-full" align="center" justify="center">
      <div className="w-1/5 h-3/4 px-6">
        <SimulationTypeCard
          selectable={true}
          title="Manual"
          mode={SimulationMode.CHAT}
        />
      </div>
      <div className="w-1/5 h-3/4 px-6">
        <SimulationTypeCard
          selectable={true}
          title="Automated"
          mode={SimulationMode.CHAT}
        />
      </div>
    </Flex>
  );
};

export default SimulationSelection;
