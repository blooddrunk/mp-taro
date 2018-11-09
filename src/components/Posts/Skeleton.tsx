import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './Skeleton.scss';
import Shape from '../UI/Skeleton/Shape';
import Paragraph from '../UI/Skeleton/Paragraph';

class PostsSkeleton extends Component {
  render() {
    return (
      <View className="Post__Skeleton">
        <Shape
          areaName="avatar"
          shape="circle"
        />
        <Shape areaName="header" />
        <Shape areaName="extra" />
        <Paragraph areaName="main"  />
        <Shape areaName="info"  />
      </View>
    );
  }
}

export default PostsSkeleton as ComponentClass;
