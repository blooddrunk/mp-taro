import { createStandardAction } from 'typesafe-actions';
import { TabItem } from 'taro-ui/@types/tab-bar';

const SET_TAB_LIST = 'ui/SET_TAB_LIST';
const SELECT_TAB_ITEM = 'ui/SELECT_TAB_ITEM';

export const setTabList = createStandardAction(SET_TAB_LIST)<TabItem[]>();
export const selectTabItem = createStandardAction(SELECT_TAB_ITEM)<number>();
