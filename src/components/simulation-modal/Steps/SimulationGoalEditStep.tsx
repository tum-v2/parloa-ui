import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'antd';
import { InputField } from '@/components/generic/InputField';

const SimulationGoalEditStep = () => {
  const [form] = Form.useForm();
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  const handleButtonClick = (buttonName: string) => {
    if (activeButtons.includes(buttonName)) {
      setActiveButtons(activeButtons.filter(btn => btn !== buttonName));
    } else {
      setActiveButtons([...activeButtons, buttonName]);
    }
  };

  const isButtonActive = (buttonName: string) =>
    activeButtons.includes(buttonName);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full max-w-4xl mx-auto p-4">
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            {/* First column */}
            <Col span={12}>
              <Form.Item label="Goal Name">
                <InputField size="large" placeholder="Goal Name" type="text" />
              </Form.Item>

              <Form.Item label="Description">
                <InputField
                  size="large"
                  placeholder="Content"
                  type="textarea"
                  minRows={4}
                />
              </Form.Item>
            </Col>

            {/* Second column */}
            <Col span={12}>
              <Form.Item label="Scenarios" className="flex flex-col gap-2">
                <Button
                  size="large"
                  type={isButtonActive('SlotFilling') ? 'primary' : 'default'}
                  onClick={() => handleButtonClick('SlotFilling')}
                  className="w-full m-4"
                >
                  Slot Filling
                </Button>
                <Button
                  size="large"
                  type={
                    isButtonActive('CallForwarding') ? 'primary' : 'default'
                  }
                  onClick={() => handleButtonClick('CallForwarding')}
                  className="w-full m-4"
                >
                  Call Forwarding
                </Button>
                <Button
                  size="large"
                  type={isButtonActive('Sequence') ? 'primary' : 'default'}
                  onClick={() => handleButtonClick('Sequence')}
                  className="w-full m-4"
                >
                  Sequence
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SimulationGoalEditStep;
