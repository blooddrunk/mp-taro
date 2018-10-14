import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';

import {
  increment,
  decrement,
  incrementAsync,
} from '../../store/modules/counter';

export interface IIndexProps {
  counter: number;
  handleIncrement: () => any;
  handleDecrement: () => any;
  handleIncrementAsync: () => any;
}

@connect(
  state => {
    return {
      counter: state.value,
    };
  },
  dispatch =>
    bindActionCreators(
      {
        handleIncrement: increment,
        handleDecrement: decrement,
        handleIncrementAsync: incrementAsync,
      },
      dispatch
    )
)
export class Index extends Component<IIndexProps, {}> {
  config = {
    navigationBarTitleText: 'Counter',
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const {
      counter,
      handleIncrement,
      handleDecrement,
      handleIncrementAsync,
    } = this.props;
    return (
      <View className="index">
        <Text>{counter}</Text>
        <Button onClick={handleIncrement}>+</Button>
        <Button onClick={handleDecrement}>-</Button>
        <Button onClick={handleIncrementAsync}>+ after 1s</Button>
      </View>
    );
  }
}
