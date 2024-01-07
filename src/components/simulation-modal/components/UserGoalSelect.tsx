import React, { useState } from 'react';
import { Form, Row, Col, Select, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentStep } from '@/store/features/CreateSimulation/SimulationControlSlice';
import { Dropdown } from '@/store/features/CreateSimulation/simulationDefinitions';
import { setUserGoal } from '@/store/features/CreateSimulation/CreateAgentSlice';
import {
  setGoal,
  resetGoalState
} from '@/store/features/CreateSimulation/CreateGoalSlice';
import { setGoalFlag } from '@/store/features/CreateSimulation/SimulationControlSlice';
import { Goal } from '@/api/schemas/goal';

const UserGoalSelect = () => {
  const goals = useAppSelector(state => state.simulationData.goals);
  const [goalValue, setGoalValue] = useState('');
  const goal = useAppSelector(state => state.goal);
  const dispatch = useAppDispatch();
  const dropdownGoals: Dropdown[] = goals.map(goal => {
    if (goal._id !== undefined) {
      return {
        value: goal._id,
        label: goal.name
      };
    } else {
      // Handle the case when goal._id is undefined
      // For example, you can return a default value:
      //TODO
      return {
        value: '',
        label: goal.name
      };
    }
  });

  // Handlers for Edit and Add buttons
  const onGoalEdit = () => {
    dispatch(setGoalFlag('EDIT'));
    dispatch(setCurrentStep(4));
    const goal = goals.find(goal => goal._id === goalValue);
    dispatch(setGoal(goal as Goal));
  };

  const onGoalAdd = () => {
    dispatch(setGoalFlag('CREATE'));
    dispatch(resetGoalState());
    dispatch(setCurrentStep(4));
  };

  const onSetUserGoal = () => {
    // Implement the logic for setting a user goal
    //TODO
    dispatch(setCurrentStep(4));
  };

  const onGoalChange = (value: string) => {
    // Implement the logic for changing the user goal
    //TODO
    dispatch(setUserGoal(value));
    setGoalValue(value);
  };

  // Render different content based on whether 'goals' array is empty
  if (dropdownGoals.length === 0) {
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
            value={goal._id}
            options={dropdownGoals}
            onChange={onGoalChange}
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
