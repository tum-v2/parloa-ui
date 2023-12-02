import { Select } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';

export type DropdownTimeRangeKeyType =
  | 'last-hour'
  | 'last-12-hours'
  | 'last-24-hours'
  | 'last-7-days'
  | 'last-30-days';

interface DropdownTimeRangeProps {
  selectedTimeRange: DropdownTimeRangeKeyType;
  setSelectedTimeRange: Dispatch<SetStateAction<DropdownTimeRangeKeyType>>;
}

interface ItemType {
  value: string;
  label: string;
}

const items: ItemType[] = [
  {
    value: 'last-hour',
    label: 'Last Hour'
  },
  {
    value: 'last-12-hours',
    label: 'Last 12 Hours'
  },
  {
    value: 'last-24-hours',
    label: 'Last 24 Hours'
  },
  {
    value: 'last-7-days',
    label: 'Last 7 Days'
  },
  {
    value: 'last-30-days',
    label: 'Last 30 Days'
  }
];

const DropdownTimeRange = ({
  selectedTimeRange,
  setSelectedTimeRange
}: DropdownTimeRangeProps) => {
  return (
    <Select
      defaultValue={selectedTimeRange}
      style={{ width: 150 }}
      onChange={value => {
        setSelectedTimeRange(value as DropdownTimeRangeKeyType);
      }}
      options={items}
    />
  );
};

export default DropdownTimeRange;
