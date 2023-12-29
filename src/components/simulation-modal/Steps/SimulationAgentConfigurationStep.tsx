import React, { useState } from 'react';
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
  const defaultLLM = 'FAKE';

  const [agentName, setAgentName] = useState<string>('');
  const [llm, setLLM] = useState<string>(defaultLLM);
  const [promptName, setPromptName] = useState<string>('');
  const [promptContent, setPromptContent] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0.5);
  const [maxTokens, setMaxTokens] = useState<number>(10);
  const [domain, setDomain] = useState<string>('demo');
  const [goal, setGoal] = useState<string>('demo');

  const [form] = Form.useForm();

  const handleTemperatureChange = (value: number) => {
    setTemperature(value);
  };

  const handleMaxTokensChange = (value: number) => {
    setMaxTokens(value);
  };

  const handleDomainChange = (value: string) => {
    setDomain(value);
  };

  const handleGoalChange = (value: string) => {
    setGoal(value);
  };

  const handleLLMChange = (value: string) => {
    setLLM(value);
  };

  const handleAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgentName(e.target.value);
  };

  const handlePromptNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptName(e.target.value);
  };

  const handlePromptContentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPromptContent(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full max-w-4xl mx-auto p-4">
        <Form form={form} layout="vertical">
          <Row gutter={24}>
            {/* First column */}
            <Col span={12}>
              <Form.Item label="Agent Name">
                <InputField
                  placeholder="Agent Name"
                  type="text"
                  value={agentName}
                  onChange={handleAgentNameChange}
                />
              </Form.Item>
              <Form.Item label="LLM Model">
                <Select
                  defaultValue={defaultLLM}
                  style={{ width: 120 }}
                  onChange={handleLLMChange}
                  options={LLMs}
                  value={llm}
                />
              </Form.Item>

              <Form.Item label="Prompt">
                <Form.Item>
                  <Button onClick={onLoadPrompt}>Load</Button>
                </Form.Item>
                <Form.Item>
                  <InputField
                    placeholder="Name"
                    type="text"
                    value={promptName}
                    onChange={handlePromptNameChange}
                  />
                </Form.Item>
                <Form.Item>
                  <InputField
                    placeholder="Content"
                    type="textarea"
                    minRows={4}
                    value={promptContent}
                    onChange={handlePromptContentChange}
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
                <Select
                  defaultValue="demo"
                  onChange={handleDomainChange}
                  value={domain}
                >
                  <Option value="demo">Demo</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>

              {type === 'user' && (
                <Form.Item label="Goal">
                  <Row gutter={8}>
                    <Col flex="auto">
                      <Select
                        defaultValue="demo"
                        style={{ width: '100%' }}
                        onChange={handleGoalChange}
                        value={goal}
                      >
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
                <Slider
                  min={0}
                  max={1}
                  value={temperature}
                  onChange={handleTemperatureChange}
                  step={0.01}
                />
              </Form.Item>
              <Form.Item label="Max Tokens">
                <Slider
                  value={maxTokens}
                  onChange={handleMaxTokensChange}
                  min={0}
                  max={4096}
                  step={128}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SimulationAgentConfigurationStep;
