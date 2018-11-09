import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AtTabBar } from 'taro-ui';
import { TabItem, AtTabBarProps } from 'taro-ui/@types/tab-bar';

import { RootState, RootAction } from '../../store';
import { tabbarActions } from '../../store/ui';

export type TabbarInjectedProps = {
  tabList: TabItem[];
  currentTabbar: number;
  selectTabItem: typeof tabbarActions.selectTabItem;
};

export type TabbarOwnProps = {
  onClick?: (index: number) => void;
};

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
    const { selectTabItem, onClick } = this.props;
    selectTabItem(index);
    if (onClick) {
      onClick(index);
    }
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
