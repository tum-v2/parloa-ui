import React, { useState } from 'react';
import { Form, Button, Input, Space, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface TagData {
  name: string;
  content: string;
}

// Dummy tags to load
const initialTags: TagData[] = [
  { name: 'Welcome', content: 'Welcome to our service.' },
  { name: 'Help', content: 'How can I assist you today?' },
  { name: 'Goodbye', content: 'Thank you for visiting us.' }
];

const PromptInput = () => {
  const [tags, setTags] = useState<TagData[]>([]);
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
    setTags(initialTags);
  };

  return (
    <Form layout="vertical">
      <Space size="middle">
        <span>Prompt</span>{' '}
        {/* Replace 'span' with a 'label' if needed for form semantics */}
        <Button onClick={handleLoad}>Load</Button>
      </Space>

      {/* Tags are now placed inside a div, which will make them appear below the Load button */}
      <div className="m-1">
        <Space>
          {tags.map((tag, index) => (
            <>
              <Tag
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
        <Input
          placeholder="Name"
          value={inputNameValue}
          onChange={e => setInputNameValue(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <TextArea
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
  );
};

export default PromptInput;
