import * as React from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';

import './index.scss';
import { RootState, RootAction } from '../../../store';
import { tabbarActions } from '../../../store/ui';
import Tabbar from '../../../components/UI/Tabbar';

export type TabbarProviderInjectedProps = {
  currentTabbar: number;
  setTabList: typeof tabbarActions.setTabList;
  selectTabItem: typeof tabbarActions.selectTabItem;
};

export type TabbarProviderOwnProps = {
  defaultTabbar?: number;
};

export type TabbarProviderProps = TabbarProviderInjectedProps &
  TabbarProviderOwnProps;

@connect(
  ({ ui }: RootState, ownProps: TabbarProviderOwnProps) => ({
    currentTabbar: ui.tabbar.current,
  }),
  (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
      {
        setTabList: tabbarActions.setTabList,
        selectTabItem: tabbarActions.selectTabItem,
      },
      dispatch
    )
)
class TabbarProvider extends Component<TabbarProviderProps> {
  componentDidMount() {
    const {
      defaultTabbar,
      currentTabbar,
      setTabList,
      selectTabItem,
    } = this.props;

    if (currentTabbar === -1 && defaultTabbar) {
      selectTabItem(defaultTabbar);
    }

    setTabList([
      { title: '待办事项', iconType: 'bullet-list', text: 'new' },
      { title: '拍照', iconType: 'camera' },
      { title: 'Posts', iconType: 'folder', text: '100', max: 99 },
    ]);
  }

  handleTabbarChange = index => {
    if (index === 2) {
      Taro.redirectTo({
        url: '/pages/posts/index',
      });
    } else {
      Taro.redirectTo({
        url: '/pages/index/index',
      });
    }
  };

  render() {
    return (
      <View className="TabbarProvider">
        <Tabbar onClick={this.handleTabbarChange} />
        <View className="TabbarProvider__Main">{this.props.children}</View>
      </View>
    );
  }
}

export default TabbarProvider as React.ComponentClass<TabbarProviderOwnProps>;
