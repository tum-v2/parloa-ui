import React, { useState } from 'react';
import { Form, Row, Col, Select, Button } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store/hooks';
import { setCurrentStep } from '@/store/features/CreateSimulation/SimulationControlSlice';

const UserGoalSelect = () => {
  const [userGoal, setUserGoal] = useState<string>(); // or the appropriate type
  const dispatch = useAppDispatch();

  // Handlers for Edit and Add buttons
  const onGoalEdit = () => {
    dispatch(setCurrentStep(4));
  };

  const onGoalAdd = () => {
    dispatch(setCurrentStep(4));
  };

  return (
    <Form.Item label="Goal">
      <Row gutter={8}>
        <Col flex="auto">
          <Select
            style={{ width: '100%' }}
            value={userGoal}
            onChange={value => setUserGoal(value)} // or the appropriate handler
            // You might want to populate the options for the Select component
          >
            {/* Add <Select.Option> here */}
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
  );
};

export default UserGoalSelect;
