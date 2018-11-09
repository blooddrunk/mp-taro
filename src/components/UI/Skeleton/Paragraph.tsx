import { ComponentClass, CSSProperties } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import classNames from 'classnames';

import './Paragraph.scss';
import Shape from './Shape';

export type ParagraphProps = {
  line?: number;
  width?: string;
  className?: string;
  areaName?: string;
};

class Paragraph extends Component<ParagraphProps> {
  static defaultProps: Partial<ParagraphProps> = {
    line: 3,
    width: '100%',
  };

  render() {
    const { line, width, className, areaName } = this.props;

    const rootClass = classNames('Skeleton__Paragraph', className);

    const style: CSSProperties = {
      width,
    };
    if (areaName) {
      style.gridArea = areaName;
    }

    return (
      <View className={rootClass} style={style}>
        {Array.from(Array(line).keys()).map(index => (
          <Shape key={index} width={index % 2 === 0 ? '100%' : '80%'} />
        ))}
      </View>
    );
  }
}

export default Paragraph as ComponentClass<ParagraphProps>;
