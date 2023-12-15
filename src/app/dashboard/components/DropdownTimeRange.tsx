import { Select } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';

// TimeRange based on number of prev days
export type DropdownTimeRangeKeyType = 1 | 3 | 7 | 14 | 30 | 60;

export enum DropdownTimeRangeKeyEnum {
  ONE_DAY = 1,
  THREE_DAYS = 3,
  SEVEN_DAYS = 7,
  TWO_WEEKS = 14,
  ONE_MONTH = 30,
  TWO_MONTHS = 60
}
interface DropdownTimeRangeProps {
  selectedTimeRange: DropdownTimeRangeKeyType;
  setSelectedTimeRange: Dispatch<SetStateAction<DropdownTimeRangeKeyType>>;
}

interface ItemType {
  value: number;
  label: string;
}

const items: ItemType[] = [
  {
    value: DropdownTimeRangeKeyEnum.ONE_DAY,
    label: 'Last 1 Day'
  },
  {
    value: DropdownTimeRangeKeyEnum.THREE_DAYS,
    label: 'Last 3 Days'
  },
  {
    value: DropdownTimeRangeKeyEnum.SEVEN_DAYS,
    label: 'Last 7 Days'
  },
  {
    value: DropdownTimeRangeKeyEnum.TWO_WEEKS,
    label: 'Last 2 Weeks'
  },
  {
    value: DropdownTimeRangeKeyEnum.ONE_MONTH,
    label: 'Last 1 Month'
  },
  {
    value: DropdownTimeRangeKeyEnum.TWO_MONTHS,
    label: 'Last 2 Months'
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
