'use client';

import SimulationModal from '@/components/simulation-modal/SimulationModal';
// import { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increment, decrement } from '@/store/features/Counter/CounterSlice';

// eslint-disable-next-line require-jsdoc
export default function Page() {
  // // Initialize the store with the product information
  // const store = useAppStore()
  // const initialized = useRef(false)
  // if (!initialized.current) {
  //   store.dispatch(initializeProduct(product))
  //   initialized.current = true
  // }
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <>
      <h1>Hello, Simulations Page!</h1>
      <SimulationModal />{' '}
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </>
  );
}
