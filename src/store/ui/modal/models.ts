import { Omit } from 'utility-types';
import { AtModalProps } from 'taro-ui/@types/modal';

export type ModalPayload = Omit<AtModalProps, 'isOpened'>;
