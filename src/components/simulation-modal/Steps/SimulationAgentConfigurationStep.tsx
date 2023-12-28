import React from 'react';
import { Form, Button, Row, Col, Select, Slider, Space } from 'antd';
import { InputField } from '@/components/generic/InputField';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import useLLMs from '@/hooks/useLLMs';

interface Props {
  onGoalEdit: () => void;
  onGoalAdd: () => void;
  onLoadPrompt: () => void;
  type: 'user' | 'service';
}

const { Option } = Select;

const SimulationAgentConfigurationStep = ({
  onGoalEdit,
  onGoalAdd,
  onLoadPrompt,
  type
}: Props) => {
  const { data } = useLLMs();
  const LLMs = data?.map(llm => ({ value: llm, label: llm }));
  // const defaultLLM = LLMs?.[0].value;
  const defaultLLM = 'FAKE';

  const [form] = Form.useForm();

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full max-w-4xl mx-auto p-4">
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            {/* First column */}
            <Col span={12}>
              <Form.Item label="Agent Name">
                <InputField placeholder="Agent Name" type="text" />
              </Form.Item>
              <Form.Item label="LLM Model">
                <Select
                  defaultValue={defaultLLM}
                  style={{ width: 120 }}
                  options={LLMs}
                />
              </Form.Item>

              <Form.Item label="Prompt">
                <Form.Item>
                  <Button onClick={onLoadPrompt}>Load</Button>
                </Form.Item>
                <Form.Item>
                  <InputField placeholder="Name" type="text" />
                </Form.Item>
                <Form.Item>
                  <InputField
                    placeholder="Content"
                    type="textarea"
                    minRows={4}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button onClick={onGoalEdit}>Edit</Button>
                  <Button onClick={onGoalAdd}>Add</Button>
                </Space>
              </Form.Item>
            </Col>

            {/* Second column */}
            <Col span={12}>
              <Form.Item label="Domain">
                <Select defaultValue="demo">
                  <Option value="demo">Demo</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>

              {type === 'user' && (
                <Form.Item label="Goal">
                  <Row gutter={8}>
                    <Col flex="auto">
                      <Select defaultValue="demo" style={{ width: '100%' }}>
                        <Option value="demo">Demo</Option>
                        {/* Add more options as needed */}
                      </Select>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} onClick={onGoalEdit} />
                    </Col>
                    <Col>
                      <Button icon={<PlusOutlined />} onClick={onGoalAdd} />
                    </Col>
                  </Row>
                </Form.Item>
              )}

              <Form.Item label="Temperature">
                <Slider />
              </Form.Item>
              <Form.Item label="Max Tokens">
                <Slider />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SimulationAgentConfigurationStep;
