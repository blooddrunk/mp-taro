import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AtButton } from 'taro-ui';
import { AtToastProps } from 'taro-ui/@types/toast';

import './index.scss';
import { counterActions } from '../../store/counter';
import { toastActions } from '../../store/ui';
import { RootState, RootAction } from '../../store';
import Toast from '../../components/UI/Toast';

export interface IndexProps {
  counter: number;
  increment: () => any;
  decrement: () => any;
  incrementAsync: () => any;
  showToast: (toast: AtToastProps) => any;
  hideToast: () => any;
}

@connect(
  ({ counter }: RootState) => {
    return {
      counter: counter.value,
    };
  },
  (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
      {
        increment: counterActions.increment,
        decrement: counterActions.decrement,
        incrementAsync: counterActions.incrementAsync,
        showToast: toastActions.showToast,
        hideToast: toastActions.hideToast,
      },
      dispatch
    )
)
class Index extends Component<IndexProps, {}> {
  R;
  config = {
    addGlobalClass: true,
    navigationBarTitleText: 'Counter',
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleShowToast = () => {
    const { showToast } = this.props;
    showToast({
      duration: 2000,
      hasMask: true,
      isOpened: true,
      text: 'this is a success toast',
      status: 'success',
      onClose: () => {
        console.log('why is this not being called');
      },
    });
  };

  render() {
    const { counter, increment, decrement, incrementAsync } = this.props;
    return (
      <View className="Index">
        <View style={{ textAlign: 'center', marginBottom: 24 }}>
          <Text>{counter}</Text>
        </View>

        <View className="Index__Button">
          <AtButton type="primary" onClick={increment}>
            +
          </AtButton>
        </View>

        <View className="Index__Button">
          <AtButton type="primary" onClick={decrement}>
            -
          </AtButton>
        </View>

        <View className="Index__Button">
          <AtButton type="primary" onClick={incrementAsync}>
            + after 1s
          </AtButton>
        </View>

        <View className="Index__Button">
          <AtButton onClick={this.handleShowToast}>Show Toast</AtButton>
        </View>

        <Toast />
      </View>
    );
  }
}

export default Index as ComponentClass;
