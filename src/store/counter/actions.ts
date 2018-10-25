import { createStandardAction } from 'typesafe-actions';

const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const INCREMENT_ASYNC = 'counter/INCREMENT_ASYNC';

export const increment = createStandardAction(INCREMENT)<void>();
export const decrement = createStandardAction(DECREMENT)<void>();
export const incrementAsync = createStandardAction(INCREMENT_ASYNC)<void>();
