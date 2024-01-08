import { SimulationType } from '@/api/schemas/simulation';
import Pill from '@/components/generic/Pill';
import { getSimulationTypeStyle } from '@/lib/utils/simulations/simulationStyles';
import { simulationTypeDescription } from '@/lib/utils/text';

interface SimulationTypePillProps {
  type: SimulationType;
  customColor?: string;
  onClick?: () => void;
}

const SimulationTypePill = ({
  type,
  customColor,
  onClick
}: SimulationTypePillProps) => {
  const typeStyle = getSimulationTypeStyle(type);

  return (
    <Pill
      color={customColor ?? typeStyle.color}
      icon={<typeStyle.icon />}
      onClick={onClick}
    >
      {simulationTypeDescription(type)}
    </Pill>
  );
};

export default SimulationTypePill;
