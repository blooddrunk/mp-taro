import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './Skeleton.scss';

export type PostsSkeletonProps = {
  count: number;
};

class PostsSkeleton extends Component<PostsSkeletonProps> {
  static options = {
    addGlobalClass: true,
  };

  static defaultProps: Partial<PostsSkeletonProps> = {
    count: 5,
  };

  render() {
    const { count } = this.props;

    return (
      <View>
        {Array.from(Array(count).keys()).map(index => (
          <View key={index} className="Post-Skeleton">
            <View className="Skeleton Post-Skeleton__Avatar" />
            <View className="Skeleton Post-Skeleton__Header" />
            <View className="Skeleton Post-Skeleton__Extra" />
            <View className="Post-Skeleton__Main">
              <View className="Skeleton" />
              <View className="Skeleton" />
              <View className="Skeleton" />
            </View>
            <View className="Skeleton Post-Skeleton__Info" />
          </View>
        ))}
      </View>
    );
  }
}

export default PostsSkeleton;
