import React, { useState } from 'react';
import { Form, Row, Col, Select, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store/hooks';
import { setCurrentStep } from '@/store/features/CreateSimulation/SimulationControlSlice';

type goals = { value: string; label: string }[];

const UserGoalSelect = () => {
  const [userGoal, setUserGoal] = useState<string>(); // or the appropriate type
  const dispatch = useAppDispatch();
  const goals: goals = []; // Populate this array as needed

  // Handlers for Edit and Add buttons
  const onGoalEdit = () => {
    dispatch(setCurrentStep(4));
  };

  const onGoalAdd = () => {
    dispatch(setCurrentStep(4));
  };

  const onSetUserGoal = () => {
    // Implement the logic for setting a user goal
    dispatch(setCurrentStep(4));
  };

  // Render different content based on whether 'goals' array is empty
  if (goals.length === 0) {
    return (
      <Form.Item label="Goal">
        <Button size="large" icon={<PlusOutlined />} onClick={onSetUserGoal}>
          Set User Goal
        </Button>
      </Form.Item>
    );
  }

  return (
    <Form.Item label="Goal">
      <Row gutter={8}>
        <Col flex="auto">
          <Select
            style={{ width: '100%' }}
            value={userGoal}
            options={goals}
            onChange={value => setUserGoal(value)}
          />
        </Col>
        <Col>
          <Button icon={<EditOutlined />} onClick={onGoalEdit} />
        </Col>
        <Col>
          <Button icon={<PlusOutlined />} onClick={onGoalAdd} />
        </Col>
      </Row>
    </Form.Item>
  );
};

export default UserGoalSelect;
