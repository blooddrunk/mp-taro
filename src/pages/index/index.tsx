import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { AtButton, AtToast } from 'taro-ui';
import { AtToastProps } from 'taro-ui/@types/toast';

import './index.scss';
import { actions as counterActions } from '../../store/modules/counter';
import { actions as toastActions, toast } from '../../store/modules/ui/toast';

export interface IndexProps {
  counter: number;
  toast: AtToastProps;
  increment: () => any;
  decrement: () => any;
  incrementAsync: () => any;
  showToast: (toast: AtToastProps) => any;
  hideToast: () => any;
}

@connect(
  ({ counter, ui }) => {
    return {
      counter: counter.value,
      toast: ui.toast,
    };
  },
  dispatch =>
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
    this.props.showToast({
      isOpened: true,
      text: 'this is a success toast',
      status: 'success',
      hasMask: true,
      onClose: this.props.hideToast,
    });
  };

  render() {
    const { counter, increment, decrement, incrementAsync, toast } = this.props;
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

        <AtToast
          hasMask={toast.hasMask}
          isOpened={toast.isOpened}
          onClose={toast.onClose}
          text={toast.text}
          status={toast.status}
        />
      </View>
    );
  }
}

export default Index as ComponentClass;
