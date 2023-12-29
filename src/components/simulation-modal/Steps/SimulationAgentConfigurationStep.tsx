import React from 'react';
import { Form, Row, Col, Select, Slider } from 'antd';
import { InputField } from '@/components/generic/InputField';
import useLLMs from '@/hooks/useLLMs';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setName,
  setLLM,
  setTemperature,
  setMaxTokens,
  setDomain
} from '../../../store/features/CreateSimulation/CreateAgentSlice';
import PromptInput from '../PromptInput';
import UserGoalSelect from '../UserGoalSelect';

interface Props {
  type: 'user' | 'service';
}

const SimulationAgentConfigurationStep = ({ type }: Props) => {
  const { data } = useLLMs();
  const LLMs = data?.map(llm => ({ value: llm, label: llm }));
  const defaultLLM = 'FAKE';
  const dispatch = useAppDispatch();
  const { name, llm, temperature, maxTokens, domain } = useAppSelector(
    state => state.agent
  );

  const [form] = Form.useForm();

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
                  value={name}
                  onChange={e => dispatch(setName(e.target.value))}
                />
              </Form.Item>
              <Form.Item label="LLM Model">
                <Select
                  defaultValue={defaultLLM}
                  style={{ width: 120 }}
                  onChange={value => dispatch(setLLM(value))}
                  options={LLMs}
                  value={llm}
                />
              </Form.Item>
              <PromptInput />
            </Col>

            {/* Second column */}
            <Col span={12}>
              <Form.Item label="Domain">
                <Select
                  onChange={value => dispatch(setDomain(value))}
                  value={domain}
                ></Select>
              </Form.Item>

              {type === 'user' && <UserGoalSelect />}

              <Form.Item label="Temperature">
                <Slider
                  min={0}
                  max={1}
                  value={temperature}
                  onChange={value => dispatch(setTemperature(value))}
                  step={0.01}
                />
              </Form.Item>
              <Form.Item label="Max Tokens">
                <Slider
                  value={maxTokens}
                  onChange={value => dispatch(setMaxTokens(value))}
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
