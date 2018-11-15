import { ReactNode } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';

import './index.scss';

export interface ListLoaderProps {
  loading: boolean;
  hasReachedEnd: boolean;
  empty: boolean;
}

class ListLoader extends Component<ListLoaderProps> {
  render() {
    const { loading, hasReachedEnd, empty } = this.props;
    let content: ReactNode;
    if (loading) {
      content = <AtActivityIndicator content="加载中..." />;
    } else if (hasReachedEnd) {
      content = <Text className="ListLoader__Text">没有更多数据...</Text>;
    } else if (empty) {
      content = <Text className="ListLoader__Text">查询结果为空:(</Text>;
    } else {
      content = null;
    }

    return <View className="ListLoader">{content}</View>;
  }
}

export default ListLoader;
