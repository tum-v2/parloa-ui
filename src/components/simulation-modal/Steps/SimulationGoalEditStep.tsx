import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'antd';
import { InputField } from '@/components/generic/InputField';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  setGoalName,
  setGoalDescription,
  setGoalScenarios
} from '@/store/features/CreateSimulation/CreateGoalSlice';

const SimulationGoalEditStep = () => {
  const dispatch = useAppDispatch();
  const { name, description, scenarios } = useAppSelector(state => state.goal);
  const [activeButtons, setActiveButtons] = useState<string[]>(scenarios);

  useEffect(() => {
    setActiveButtons(scenarios);
  }, [scenarios]);

  const handleButtonClick = (buttonName: string) => {
    let updatedActiveButtons;

    if (activeButtons.includes(buttonName)) {
      updatedActiveButtons = activeButtons.filter(btn => btn !== buttonName);
    } else {
      updatedActiveButtons = [...activeButtons, buttonName];
    }

    setActiveButtons(updatedActiveButtons);
    dispatch(setGoalScenarios(updatedActiveButtons));
  };

  const isButtonActive = (buttonName: string) =>
    activeButtons.includes(buttonName);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGoalName(e.target.value));
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGoalDescription(e.target.value));
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full max-w-4xl mx-auto p-4">
        <Row gutter={24}>
          {/* First column */}
          <Col span={12}>
            <div>
              <div className="mt-4 mb-4 font-bold">
                <label>Name:</label>
              </div>

              <InputField
                size="large"
                placeholder="Goal Name"
                type="text"
                value={name}
                onChange={onNameChange}
              />
            </div>

            <div>
              <div className="mt-4 mb-4 font-bold">
                <label>Description:</label>
              </div>
              <InputField
                size="large"
                placeholder="Description"
                type="textarea"
                minRows={6}
                maxRows={6}
                value={description}
                onChange={onDescriptionChange}
              />
            </div>
          </Col>

          {/* Second column */}
          <Col span={12}>
            <div>
              <div className="mt-4 mb-4 font-bold">
                <label>Scenarios:</label>
              </div>
              <Button
                size="large"
                type={isButtonActive('SLOT_FILLING') ? 'primary' : 'default'}
                onClick={() => handleButtonClick('SLOT_FILLING')}
                className="w-full m-4"
              >
                SLOT_FILLING
              </Button>
            </div>
            <div>
              <Button
                size="large"
                type={isButtonActive('CALL_FORWARDING') ? 'primary' : 'default'}
                onClick={() => handleButtonClick('CALL_FORWARDING')}
                className="w-full m-4"
              >
                CALL_FORWARDING
              </Button>
            </div>
            <div>
              <Button
                size="large"
                type={isButtonActive('SEQUENCE') ? 'primary' : 'default'}
                onClick={() => handleButtonClick('SEQUENCE')}
                className="w-full m-4"
              >
                SEQUENCE
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SimulationGoalEditStep;
