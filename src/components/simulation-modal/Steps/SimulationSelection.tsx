import React from 'react';
import SimulationTypeCard from '../SimulationTypeCard';
import { SimulationMode } from '../SimulationTypeCard';
import { Flex } from 'antd';

const SimulationSelection = () => {
  return (
    <Flex className="w-full h-full" align="center" justify="center">
      <div className="h-3/4 px-6 aspect-[3/4]">
        <SimulationTypeCard
          selectable={true}
          title="Manual"
          mode={SimulationMode.CHAT}
        />
      </div>
      <div className="h-3/4 px-6 aspect-[3/4]">
        <SimulationTypeCard
          selectable={true}
          title="Automated"
          mode={SimulationMode.AUTOMATED}
        />
      </div>
    </Flex>
  );
};

export default SimulationSelection;
