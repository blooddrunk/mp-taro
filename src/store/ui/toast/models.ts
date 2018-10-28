import { Omit } from 'utility-types';
import { AtToastProps } from 'taro-ui/@types/toast';

export type ToastPayload = Omit<AtToastProps, 'isOpened'>;
