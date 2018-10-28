import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AtButton } from 'taro-ui';

import './index.scss';
import { authActions, authModels } from '../../store/auth';
import { counterActions } from '../../store/counter';
import { toastActions } from '../../store/ui';
import { RootState, RootAction } from '../../store';
import Toast from '../../components/UI/Toast';

export interface IndexProps {
  user: authModels.User;
  login: typeof authActions.loginActions.request;
  isLoginPending: boolean;
  counter: number;
  increment: typeof counterActions.increment;
  decrement: typeof counterActions.decrement;
  incrementAsync: typeof counterActions.incrementAsync;
  showToast: typeof toastActions.showToast;
}

@connect(
  ({ auth, counter }: RootState) => {
    return {
      user: auth.user,
      isLoginPending: auth.isLoginPending,
      counter: counter.value,
    };
  },
  (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
      {
        login: authActions.loginActions.request,
        increment: counterActions.increment,
        decrement: counterActions.decrement,
        incrementAsync: counterActions.incrementAsync,
        showToast: toastActions.showToast,
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

  componentDidMount() {
    this.props.login();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleInrement = () => {
    this.props.increment();
  };

  handleDecrement = () => {
    this.props.decrement();
  };

  handleIncrementAsync = () => {
    this.props.incrementAsync();
  };

  handleShowToast = () => {
    this.props.showToast({
      duration: 2000,
      hasMask: true,
      text: 'this is a success toast',
      status: 'success',
      onClose: () => {
        console.log('why is this not being called');
      },
    });
  };

  handleLogin = () => {
    this.props.login();
  };

  render() {
    const { isLoginPending, counter } = this.props;
    return (
      <View className="Index">
        <View style={{ textAlign: 'center', marginBottom: 24 }}>
          <Text>{`Counter: ${counter}`}</Text>
        </View>

        <View className="Index__Button">
          <AtButton type="primary" onClick={this.handleInrement}>
            +
          </AtButton>
        </View>

        <View className="Index__Button">
          <AtButton type="primary" onClick={this.handleDecrement}>
            -
          </AtButton>
        </View>

        <View className="Index__Button">
          <AtButton type="primary" onClick={this.handleIncrementAsync}>
            + after 1s
          </AtButton>
        </View>

        <View className="Index__Button">
          <AtButton onClick={this.handleShowToast}>Show Toast</AtButton>
        </View>

        <View className="Index__Button">
          <AtButton onClick={this.handleLogin} disabled={isLoginPending}>
            Login
          </AtButton>
        </View>

        <Toast />
      </View>
    );
  }
}

export default Index as ComponentClass;
