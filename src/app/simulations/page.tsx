'use client';

import SimulationModal from '@/components/simulation-modal/SimulationModal';
// import { useRef } from 'react';
// import { useAppSelector, useAppDispatch } from '@/store/hooks';
// import { increment, decrement } from '@/store/features/Counter/CounterSlice';
// import { Button } from 'antd';

// eslint-disable-next-line require-jsdoc
export default function Page() {
  // const count = useAppSelector(state => state.counter.value);
  // const dispatch = useAppDispatch();
  return (
    <>
      <h1>Hello, Simulations Page!</h1>
      <SimulationModal />{' '}
      {/* <div style={{ padding: 40 }}>
        <div>
          <Button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </Button>
          <span>
            {'  '}
            {count}
            {'  '}
          </span>
          <Button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </Button>
        </div>
      </div> */}
    </>
  );
}
