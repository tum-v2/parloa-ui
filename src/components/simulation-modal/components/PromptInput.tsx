import React, { useState } from 'react';
import { Form, Button, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { InputField } from '@/components/generic/InputField';
import theme from '@/theme/theme';
import { PromptPart } from '@/store/features/CreateSimulation/simulationDefinitions';
import { useAppSelector } from '@/store/hooks';

const pillStyle: React.CSSProperties = {
  borderRadius: 50,
  width: 'max-content',
  maxWidth: '150px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  paddingTop: theme.padding.xs,
  paddingLeft: theme.padding.m,
  paddingRight: theme.padding.m,
  paddingBottom: theme.padding.xs
};

const PromptInput = () => {
  const { prompts } = useAppSelector(state => state.simulationData);
  const [tags, setTags] = useState<PromptPart[]>([]);
  const [inputNameValue, setInputNameValue] = useState('');
  const [inputContentValue, setInputContentValue] = useState('');
  const [editTagIndex, setEditTagIndex] = useState<number | null>(null);

  const handleTagClick = (index: number) => {
    setInputNameValue(tags[index].name);
    setInputContentValue(tags[index].content);
    setEditTagIndex(index);
  };

  const handleEdit = () => {
    if (editTagIndex !== null) {
      const newTags = [...tags];
      newTags[editTagIndex] = {
        name: inputNameValue,
        content: inputContentValue
      };
      setTags(newTags);
      setEditTagIndex(null);
      setInputNameValue('');
      setInputContentValue('');
    }
  };

  const handleAdd = () => {
    if (inputNameValue && !tags.find(tag => tag.name === inputNameValue)) {
      setTags([...tags, { name: inputNameValue, content: inputContentValue }]);
      setInputNameValue('');
      setInputContentValue('');
    }
  };

  const handleLoad = () => {
    setTags(prompts);
  };

  return (
    <>
      <Form layout="vertical">
        <Space size="middle">
          <span>Prompt</span>{' '}
          {/* Replace 'span' with a 'label' if needed for form semantics */}
          <Button onClick={handleLoad}>Load</Button>
        </Space>

        {/* Tags are now placed inside a div, which will make them appear below the Load button */}
        <div className="m-4 flex flex-wrap gap-2 overflow-y-auto">
          <Space>
            {tags.map((tag, index) => (
              <>
                <Tag
                  style={pillStyle}
                  color={theme.color.primary}
                  key={tag.name}
                  onClick={() => handleTagClick(index)}
                  closable
                  onClose={e => {
                    e.preventDefault(); // Prevent the tag click handler when closing the tag
                    setTags(tags.filter((_, i) => i !== index));
                    if (editTagIndex === index) {
                      setEditTagIndex(null);
                      setInputNameValue('');
                      setInputContentValue('');
                    }
                  }}
                >
                  {tag.name}
                </Tag>
              </>
            ))}
          </Space>
        </div>

        <Form.Item>
          <InputField
            size="large"
            type="text"
            placeholder="Name"
            value={inputNameValue}
            onChange={e => setInputNameValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <InputField
            size="large"
            minRows={6}
            maxRows={6}
            type="textarea"
            placeholder="Content"
            value={inputContentValue}
            onChange={e => setInputContentValue(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            {editTagIndex !== null ? (
              <Button onClick={handleEdit}>Edit</Button>
            ) : (
              <Button icon={<PlusOutlined />} onClick={handleAdd}>
                Add
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default PromptInput;
