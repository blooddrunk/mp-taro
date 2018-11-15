import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AtToast } from 'taro-ui';
import { AtToastProps } from 'taro-ui/@types/toast';
import { BaseEventFunction } from '@tarojs/components/types/common';

import { RootState, RootAction } from '../../../store';
import { toastActions } from '../../../store/ui';

export type ToastInjectedProps = {
  toast: AtToastProps;
  handleClose: BaseEventFunction | undefined;
  hideToast: typeof toastActions.hideToast;
};

export type ToastOwnProps = {};

export type ToastProps = ToastInjectedProps & ToastOwnProps;

@connect(
  ({ ui }: RootState, ownProps: ToastOwnProps) => {
    return {
      toast: ui.toast,
      handleClose: ui.toast.onClose,
    };
  },
  (dispatch: Dispatch<RootAction>) =>
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
    const { handleClose, hideToast } = this.props;

    hideToast();

    if (handleClose) {
      handleClose(event);
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

export default Toast as ComponentClass<ToastOwnProps>;
