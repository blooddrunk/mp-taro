import { ActionType, getType } from 'typesafe-actions';
import produce from 'immer';
import { TabItem } from 'taro-ui/@types/tab-bar';

import * as actions from './actions';

export type TabbarActions = ActionType<typeof actions>;

export type TabbarState = Readonly<{
  tabList: TabItem[];
  current: number;
}>;

export const tabbarInitialState: TabbarState = {
  tabList: [],
  current: -1,
};

export const tabbar = produce((draft, action: TabbarActions) => {
  switch (action.type) {
    case getType(actions.setTabList):
      draft.tabList = action.payload;
      return;
    case getType(actions.selectTabItem):
      draft.current = action.payload;
      return;
  }
}, tabbarInitialState);
