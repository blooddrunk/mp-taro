import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AtModal } from 'taro-ui';
import { AtModalProps } from 'taro-ui/@types/modal';
import { BaseEventFunction } from '@tarojs/components/types/common';

import { RootState, RootAction } from '../../../store';
import { modalActions } from '../../../store/ui';
import { commonExceptionFactory } from '../../../services';

export type ModalInjectedProps = {
  modal: AtModalProps;
  handleClose: BaseEventFunction | undefined;
  handleCancel: BaseEventFunction | undefined;
  handleConfirm: BaseEventFunction | undefined;
  hideModal: typeof modalActions.hideModal;
};

export type ModalOwnProps = {};

export type ModalProps = ModalInjectedProps & ModalOwnProps;

@connect(
  ({ ui }: RootState, ownProps: ModalOwnProps) => {
    return {
      modal: ui.modal,
      handleClose: ui.modal.onClose,
      handleCancel: ui.modal.onCancel,
      handleConfirm: ui.modal.onConfirm,
    };
  },
  (dispatch: Dispatch<RootAction>) =>
    bindActionCreators(
      {
        hideModal: modalActions.hideModal,
      },
      dispatch
    )
)
class Modal extends Component<ModalProps> {
  shouldComponentUpdate({ modal }: ModalProps) {
    return modal.isOpened !== this.props.modal.isOpened;
  }

  handleClose = event => {
    const { handleClose, hideModal } = this.props;

    hideModal();

    if (handleClose) {
      handleClose(event);
    }
  };

  handleCancel = async event => {
    const { handleCancel, hideModal } = this.props;

    if (handleCancel) {
      try {
        await handleCancel(event);
      } catch (error) {
        throw commonExceptionFactory({
          message: 'error occurred in `onCancel`',
          meta: error,
        });
      }
    }

    hideModal();
  };

  handleConfirm = async event => {
    const { handleConfirm, hideModal } = this.props;

    if (handleConfirm) {
      try {
        await handleConfirm(event);
      } catch (error) {
        throw commonExceptionFactory({
          message: 'error occurred in `onConfirm`',
          meta: error,
        });
      }
    }

    hideModal();
  };

  render() {
    const {
      modal: { title, isOpened, content, cancelText, confirmText },
    } = this.props;
    return (
      <AtModal
        title={title}
        isOpened={isOpened}
        content={content}
        cancelText={cancelText}
        confirmText={confirmText}
        onClose={this.handleClose}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
      />
    );
  }
}

export default Modal as ComponentClass<ModalOwnProps>;
