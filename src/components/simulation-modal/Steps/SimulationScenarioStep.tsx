import React, { useState } from 'react';
import { Select, Slider, Segmented } from 'antd';
import { InputField } from '../../generic/InputField';
import theme from '@/theme/theme';

const SimulationScenario = () => {
  const [temperature, setTemperature] = useState<number>(0.5);
  const [maxTokens, setMaxTokens] = useState<number>(2048);

  const inputFieldStyle = { marginBottom: theme.margin.l };
  const sliderContainerStyle = { marginTop: theme.margin.l };

  const handleScenarioTypeChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '80%'
      }}
    >
      <div style={{ width: '40%', padding: theme.padding.l }}>
        <div style={inputFieldStyle}>
          <label
            htmlFor="template-name"
            style={{ display: 'block', marginBottom: theme.padding.s }}
          >
            Template Name
          </label>
          <InputField id="template-name" type="text" size="large" />
        </div>
        <div style={inputFieldStyle}>
          <label
            htmlFor="instructions"
            style={{ display: 'block', marginBottom: theme.padding.s }}
          >
            Instructions
          </label>
          <InputField
            id="instructions"
            type="textarea"
            size="large"
            minRows={6}
          />
        </div>
      </div>
      <div style={{ width: '40%', padding: theme.padding.l }}>
        <Select
          defaultValue="Sequence"
          style={{ width: 120 }}
          onChange={handleScenarioTypeChange}
          options={[
            { value: 'Sequence', label: 'Sequence' },
            { value: 'Slot Filling', label: 'Slot Filling' },
            { value: 'Call Forward', label: 'Call Forward' }
          ]}
        />
        <div style={sliderContainerStyle}>
          <label>Temperature (0 - 1):</label>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={temperature}
            onChange={value => setTemperature(value as number)}
          />
        </div>
        <div style={sliderContainerStyle}>
          <label>Max Tokens (1024 - 4096):</label>
          <Slider
            min={1024}
            max={4096}
            step={1}
            value={maxTokens}
            onChange={value => setMaxTokens(value as number)}
          />
        </div>
        <div style={sliderContainerStyle}>
          <label>Overwrite Template:</label>
          <br />
          <Segmented options={['Yes', 'No']} />
        </div>
      </div>
    </div>
  );
};

export default SimulationScenario;
