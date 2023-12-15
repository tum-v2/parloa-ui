import React, { useState, useEffect } from 'react';
import { Slider, Segmented, Flex } from 'antd';
import { InputField } from '../../generic/InputField';
import theme from '@/theme/theme';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  setServiceAgent,
  setUserAgent
} from '@/store/features/CreateSimulation/CreateSimulationSlice';

const SimulationScenario = () => {
  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();

  // Set default values based on simulation.Flag
  useEffect(() => {
    if (simulation.Flag === 'ServiceAgent') {
      setDomain(simulation.serviceAgentConfig.domain || '');
      setPrompt(simulation.serviceAgentConfig.prompt || '');
      setTemperature(simulation.serviceAgentConfig.temperature || 0.5);
      setMaxTokens(simulation.serviceAgentConfig.maxTokens || 2048);
    } else {
      setDomain(simulation.userAgentConfig.domain || '');
      setPrompt(simulation.userAgentConfig.prompt || '');
      setTemperature(simulation.userAgentConfig.temperature || 0.5);
      setMaxTokens(simulation.userAgentConfig.maxTokens || 2048);
    }
  }, [
    simulation.Flag,
    simulation.serviceAgentConfig,
    simulation.userAgentConfig
  ]);
  // New state variables for domain and prompt
  const [domain, setDomain] = useState('');
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState<number>(0.5);
  const [maxTokens, setMaxTokens] = useState<number>(2048);

  // Handlers for state changes
  const handleDomainChange = (newDomain: string) => {
    setDomain(newDomain);
    console.log(`Domain changed to: ${newDomain}`);
    if (simulation.Flag == 'ServiceAgent') {
      dispatch(
        setServiceAgent({
          ...simulation.serviceAgentConfig,
          domain: newDomain
        })
      );
    } else {
      dispatch(
        setUserAgent({
          ...simulation.userAgentConfig,
          domain: newDomain
        })
      );
    }
  };

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
    console.log(`Prompt changed to: ${newPrompt}`);
    if (simulation.Flag == 'ServiceAgent') {
      dispatch(
        setServiceAgent({
          ...simulation.serviceAgentConfig,
          prompt: newPrompt
        })
      );
    } else {
      dispatch(
        setUserAgent({
          ...simulation.userAgentConfig,
          prompt: newPrompt
        })
      );
    }
  };

  const handleMaxTokensChange = (newMaxTokens: number) => {
    setMaxTokens(newMaxTokens);
    console.log(`Max Tokens changed to: ${newMaxTokens}`);
    if (simulation.Flag == 'ServiceAgent') {
      dispatch(
        setServiceAgent({
          ...simulation.serviceAgentConfig,
          maxTokens: newMaxTokens
        })
      );
    } else {
      dispatch(
        setUserAgent({
          ...simulation.userAgentConfig,
          maxTokens: newMaxTokens
        })
      );
    }
  };

  const handleTemperatureChange = (newTemperature: number) => {
    setTemperature(newTemperature);
    console.log(`Temperature changed to: ${newTemperature}`);
    if (simulation.Flag == 'ServiceAgent') {
      dispatch(
        setServiceAgent({
          ...simulation.serviceAgentConfig,
          temperature: newTemperature
        })
      );
    } else {
      dispatch(
        setUserAgent({
          ...simulation.userAgentConfig,
          temperature: newTemperature
        })
      );
    }
  };

  const inputFieldStyle = { marginBottom: theme.margin.l };
  const sliderContainerStyle = { marginTop: theme.margin.l };

  return (
    <Flex justify="center" align="flex-start" className="h-3/4 w-full">
      <div style={{ width: '40%', padding: theme.padding.l }}>
        <div style={inputFieldStyle}>
          <label
            htmlFor="template-name"
            style={{ display: 'block', marginBottom: theme.padding.s }}
          >
            Domain
          </label>
          <InputField
            id="template-name"
            type="text"
            size="large"
            value={domain}
            onChange={e => handleDomainChange(e.target.value)}
          />
        </div>
        <div style={inputFieldStyle}>
          <label
            htmlFor="instructions"
            style={{ display: 'block', marginBottom: theme.padding.s }}
          >
            Prompt
          </label>
          <InputField
            id="instructions"
            type="textarea"
            size="large"
            minRows={6}
            value={prompt}
            onChange={e => handlePromptChange(e.target.value)}
          />
        </div>
      </div>
      <div style={{ width: '40%', padding: theme.padding.l }}>
        <div style={sliderContainerStyle}>
          <label>Temperature (0 - 1):</label>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={temperature}
            onChange={number => handleTemperatureChange(number)}
          />
        </div>
        <div style={sliderContainerStyle}>
          <label>Max Tokens (1024 - 4096):</label>
          <Slider
            min={1024}
            max={4096}
            step={1}
            value={maxTokens}
            onChange={handleMaxTokensChange}
          />
        </div>
        <div style={sliderContainerStyle}>
          <label>Overwrite Template:</label>
          <br />
          <Segmented options={['Yes', 'No']} />
        </div>
      </div>
    </Flex>
  );
};

export default SimulationScenario;
