import { createStandardAction } from 'typesafe-actions';

export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT = 'counter/DECREMENT';
export const INCREMENT_ASYNC = 'counter/INCREMENT_ASYNC';

export const increment = createStandardAction(INCREMENT)<void>();
export const decrement = createStandardAction(DECREMENT)<void>();
export const incrementAsync = createStandardAction(INCREMENT_ASYNC)<void>();
