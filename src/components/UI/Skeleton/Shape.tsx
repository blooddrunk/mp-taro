import { ComponentClass, CSSProperties } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import classNames from 'classnames';

import './Shape.scss';

export type ShapeProps = {
  shape?: 'line' | 'square' | 'circle';
  height?: string;
  width?: string;
  size?: string;
  className?: string;
  areaName?: string;
};

class Shape extends Component<ShapeProps> {
  static options = {
    addGlobalClass: true,
  };

  static defaultProps: Partial<ShapeProps> = {
    shape: 'line',
    height: '1em',
    width: '100%',
    size: '100%',
  };

  render() {
    const { shape, height, width, size, className, areaName } = this.props;

    const rootClass = classNames('Skeleton__Shape', className);

    let style: CSSProperties;
    switch (shape) {
      case 'square':
        style = {
          height: size,
          width: size,
        };
        break;
      case 'circle':
        style = {
          height: size,
          width: size,
          borderRadius: '100%',
        };
        break;
      default:
        style = {
          height,
          width,
        };
        break;
    }
    if (areaName) {
      style.gridArea = areaName;
    }

    return <View className={rootClass} style={style} />;
  }
}

export default Shape as ComponentClass<ShapeProps>;
