import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import { InputField } from '@/components/generic/InputField';

const SimulationGoalEditStep = () => {
  const [form] = Form.useForm();

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full max-w-4xl mx-auto p-4">
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            {/* First column */}
            <Col span={12}>
              <Form.Item label="Goal Name">
                <InputField placeholder="Agent Name" type="text" />
              </Form.Item>

              <Form.Item label="Description">
                <InputField placeholder="Content" type="textarea" minRows={4} />
              </Form.Item>
            </Col>

            {/* Second column */}
            <Col span={12}>
              <Form.Item label="Scenarios">
                <Button> Slot Filling</Button>
                <Button> Call Forwarding</Button>
                <Button> Sequence</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SimulationGoalEditStep;
