import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../redux/reducers/counterSlice';
import type { RootState } from '../redux/store';

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;