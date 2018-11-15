import Taro, { Component } from '@tarojs/taro';

import Toast from '../../components/UI/Toast';
import Modal from '../../components/UI/Modal';
import { View } from '@tarojs/components';

class UIProvider extends Component {
  render() {
    return (
      <View>
        {this.props.children}

        <Toast />
        <Modal />
      </View>
    );
  }
}

export default UIProvider;
