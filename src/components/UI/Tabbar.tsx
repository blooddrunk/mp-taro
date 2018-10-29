import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AtTabBar } from 'taro-ui';
import { TabItem } from 'taro-ui/@types/tab-bar';

import { RootState, RootAction } from '../../store';
import { tabbarActions } from '../../store/ui';

export type TabbarInjectedProps = {
  tabList: TabItem[];
  currentTabbar: number;
  selectTabItem: typeof tabbarActions.selectTabItem;
};

export type TabbarOwnProps = {};

export type TabbarProps = TabbarInjectedProps & TabbarOwnProps;

@connect(
  ({ ui }: RootState, ownProps: TabbarOwnProps) => {
    return {
      tabList: ui.tabbar.tabList,
      currentTabbar: ui.tabbar.current,
    };
  },
  (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
      {
        selectTabItem: tabbarActions.selectTabItem,
      },
      dispatch
    )
)
class Tabbar extends Component<TabbarProps> {
  handleClick = index => {
    this.props.selectTabItem(index);
  };

  render() {
    const { tabList, currentTabbar } = this.props;
    return (
      <AtTabBar
        fixed
        tabList={tabList}
        onClick={this.handleClick}
        current={currentTabbar}
      />
    );
  }
}

export default Tabbar as ComponentClass<TabbarOwnProps>;
