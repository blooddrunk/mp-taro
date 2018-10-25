import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { AtToast } from 'taro-ui';
import { AtToastProps } from 'taro-ui/@types/toast';

import { RootState } from '../../store';
import { toastActions } from '../../store/ui';

export interface ToastInjectedProps {
  toast: AtToastProps;
  hideToast: () => any;
}

export interface ToastOwnProps {}

export interface ToastProps extends ToastInjectedProps, ToastOwnProps {}

@connect(
  ({ ui }: RootState) => {
    return {
      toast: ui.toast,
    };
  },
  dispatch =>
    bindActionCreators(
      {
        hideToast: toastActions.hideToast,
      },
      dispatch
    )
)
class Toast extends Component<ToastProps> {
  shouldComponentUpdate({ toast }: ToastProps) {
    return toast.isOpened !== this.props.toast.isOpened;
  }

  handleClose = event => {
    const {
      toast: { onClose },
      hideToast,
    } = this.props;
    hideToast();

    if (onClose) {
      console.log(onClose);
      // FIXME this doesn't work
      this.props.toast.onClose!(event);
    }
  };

  render() {
    const {
      toast: {
        duration,
        hasMask,
        icon,
        image,
        isOpened,
        onClick,
        status,
        text,
      },
    } = this.props;
    return (
      <AtToast
        duration={duration}
        hasMask={hasMask}
        icon={icon}
        image={image}
        isOpened={isOpened}
        onClick={onClick}
        onClose={this.handleClose}
        status={status}
        text={text}
      />
    );
  }
}

export default Toast as ComponentClass;
