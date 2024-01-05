import React, { useState } from 'react';
import { Button, Space, Tag, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { InputField } from '@/components/generic/InputField';
import theme from '@/theme/theme';
import { PromptPart } from '@/store/features/CreateSimulation/simulationDefinitions';
import { useAppDispatch } from '@/store/hooks';
import { setPrompt } from '@/store/features/CreateSimulation/CreateAgentSlice';
import usePrompts from '@/hooks/prompts/usePrompts';
import usePromptNames from '@/hooks/prompts/usePromptNames';

const pillStyle: React.CSSProperties = {
  borderRadius: 50,
  width: 'max-content',
  maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  paddingTop: theme.padding.xs,
  paddingLeft: theme.padding.m,
  paddingRight: theme.padding.m,
  paddingBottom: theme.padding.xs
};

interface Props {
  domain: string;
  agentType: 'USER' | 'SERVICE';
}

const PromptInput = ({ domain, agentType }: Props) => {
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<PromptPart[]>([]);
  const { data: promptNames } = usePromptNames(agentType);
  const { data: promptParts } = usePrompts(domain, agentType);

  const [selectedPromptName, setSelectedPromptName] = useState('');
  const [inputContentValue, setInputContentValue] = useState('');
  const [editTagIndex, setEditTagIndex] = useState<number | null>(null);

  const handleTagClick = (index: number) => {
    setSelectedPromptName(tags[index].name);
    setInputContentValue(tags[index].content);
    setEditTagIndex(index);
  };

  const handleEdit = () => {
    if (editTagIndex !== null) {
      const newTags = [...tags];
      newTags[editTagIndex] = {
        name: selectedPromptName,
        content: inputContentValue
      };
      setTags(newTags);
      setEditTagIndex(null);
      dispatch(setPrompt(newTags));
      setSelectedPromptName('');
      setInputContentValue('');
    }
  };

  const handleAdd = () => {
    if (
      selectedPromptName &&
      !tags.find(tag => tag.name === selectedPromptName)
    ) {
      setTags([
        ...tags,
        { name: selectedPromptName, content: inputContentValue }
      ]);
      dispatch(
        setPrompt([
          ...tags,
          { name: selectedPromptName, content: inputContentValue }
        ])
      );
      setSelectedPromptName('');
      setInputContentValue('');
    }
  };

  const handleLoad = () => {
    if (promptParts) {
      dispatch(setPrompt(promptParts));
      setTags(promptParts);
    }
  };

  return (
    <>
      <Space size="middle">
        <span>Prompt</span>{' '}
        {/* Replace 'span' with a 'label' if needed for form semantics */}
        <Button onClick={handleLoad}>Load</Button>
      </Space>

      {/* Tags are now placed inside a div, which will make them appear below the Load button */}
      <div className="m-4">
        {tags.map((tag, index) => (
          <Tag
            style={pillStyle}
            color={theme.color.primary}
            key={index}
            onClick={() => handleTagClick(index)}
            closable
            onClose={e => {
              e.preventDefault(); // Prevent the tag click handler when closing the tag
              setTags(tags.filter((_, i) => i !== index));
              if (editTagIndex === index) {
                setEditTagIndex(null);
                setSelectedPromptName('');
                setInputContentValue('');
              }
            }}
          >
            {tag.name}
          </Tag>
        ))}
      </div>
      <div className="mt-4 mb-4">
        <Select
          size="large"
          placeholder="Select a prompt name"
          value={selectedPromptName}
          onChange={value => setSelectedPromptName(value)}
          style={{ width: '100%' }}
        >
          {promptNames &&
            promptNames.map((promptName, index) => (
              <Select.Option key={index} value={promptName}>
                {promptName}
              </Select.Option>
            ))}
        </Select>
      </div>
      <div className=" mb-4">
        <InputField
          size="large"
          minRows={6}
          maxRows={6}
          type="textarea"
          placeholder="Content"
          value={inputContentValue}
          onChange={e => setInputContentValue(e.target.value)}
        />
      </div>
      <Space>
        {editTagIndex !== null ? (
          <Button onClick={handleEdit}>Edit</Button>
        ) : (
          <Button icon={<PlusOutlined />} onClick={handleAdd}>
            Add
          </Button>
        )}
      </Space>
    </>
  );
};

export default PromptInput;
