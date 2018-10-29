import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AtButton, AtAvatar, AtTabBar } from 'taro-ui';

import './index.scss';
import { RootState, RootAction } from '../../store';
import { authActions, authModels } from '../../store/auth';
import { counterActions } from '../../store/counter';
import { toastActions, modalActions, tabbarActions } from '../../store/ui';
import Toast from '../../components/UI/Toast';
import Modal from '../../components/UI/Modal';
import Tabbar from '../../components/UI/Tabbar';

export interface IndexProps {
  user: authModels.User;
  login: typeof authActions.loginActions.request;
  isLoginPending: boolean;
  counter: number;
  increment: typeof counterActions.increment;
  decrement: typeof counterActions.decrement;
  incrementAsync: typeof counterActions.incrementAsync;
  showToast: typeof toastActions.showToast;
  showModal: typeof modalActions.showModal;
  setTabList: typeof tabbarActions.setTabList;
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
        showModal: modalActions.showModal,
        setTabList: tabbarActions.setTabList,
      },
      dispatch
    )
)
class Index extends Component<IndexProps, {}> {
  config = {
    addGlobalClass: true,
    navigationBarTitleText: 'Index',
  };

  componentWillMount() {
    this.props.setTabList([
      { title: '待办事项', iconType: 'bullet-list', text: 'new' },
      { title: '拍照', iconType: 'camera' },
      { title: '文件夹', iconType: 'folder', text: '100', max: 99 },
    ]);
  }

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

  handleShowModal = () => {
    this.props.showModal({
      title: 'Some Modal',
      content: 'with some content\n and some other content',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onCancel: () => {
        this.props.showToast({
          duration: 1000,
          text: 'onCancel clicked',
          hasMask: true,
        });
      },
      onConfirm: () => {
        this.props.showToast({
          duration: 1000,
          text: 'onConfirm clicked',
          hasMask: true,
        });
      },
    });
  };

  handleLogin = () => {
    this.props.login();
  };

  render() {
    const { user, isLoginPending, counter } = this.props;
    return (
      <View className="Index">
        <View className="Index__Content">
          <AtAvatar circle image={user.avatarUrl} />
        </View>

        <View className="Index__Content">
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
          <AtButton onClick={this.handleShowModal}>Show Modal</AtButton>
        </View>

        <View className="Index__Button">
          <AtButton onClick={this.handleLogin} disabled={isLoginPending}>
            Login
          </AtButton>
        </View>

        <Tabbar />
        <Toast />
        <Modal />
      </View>
    );
  }
}

export default Index as ComponentClass;
