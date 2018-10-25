import { ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

import * as actions from './actions';

export type CounterActions = ActionType<typeof actions>;

export type CounterState = Readonly<{
  value: number;
}>;

export const counter = produce<CounterState>(
  (draft, action) => {
    switch (action.type) {
      case getType(actions.increment):
        draft.value += 1;
        return draft;
      case getType(actions.decrement):
        draft.value -= 1;
        return draft;
    }
  },
  { value: 0 }
);
