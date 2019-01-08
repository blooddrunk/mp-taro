import { ActionType, getType } from 'typesafe-actions';
import produce from 'immer';

import * as actions from './actions';

export type CounterActions = ActionType<typeof actions>;

export type CounterState = Readonly<{
  value: number;
}>;

export const counterInitialState: CounterState = {
  value: 0,
};

export const counter = produce((draft, action: CounterActions) => {
  switch (action.type) {
    case getType(actions.increment):
      draft.value += 1;
      return;
    case getType(actions.decrement):
      draft.value -= 1;
      return;
  }
}, counterInitialState);
