import Taro, { request } from '@tarojs/taro';

import { store } from '../store/configureStore';
import { toastActions } from '../store/ui/toast';
import { authModels } from '../store/auth';
import { validateStatus } from './util';
import { modalActions } from '../store/ui';

const isDev = process.env.NODE_ENV === 'development';

export const LOGIN_AUTH_KEY = 'LOGIN_AUTH_KEY';

export type LoginRequest = authModels.User & {
  code?: string;
};

export type LoginResponse = {
  token?: string;
};

const onLoginFailure = async error => {
  store.dispatch(
    toastActions.showToast({
      text: '登录失败',
      duration: 2000,
      status: 'error',
      hasMask: true,
    })
  );

  Taro.navigateBack({
    delta: 0,
  });

  if (isDev) {
    console.error(error);
  }

  // TODO re-throw error maybe?
  // throw error;
};

export const login = async () => {
  let code = '';

  // get login code
  try {
    const response = await Taro.login();
    code = response.code;

    if (isDev) {
      console.group('login code');
      console.log(code);
      console.groupEnd();
    }
  } catch (error) {
    onLoginFailure(error);
  }

  let authorized = true;
  let userInfo: LoginRequest = {};

  // get userInfo
  try {
    const response = await Taro.getUserInfo();
    userInfo = response.userInfo;
  } catch (error) {
    // user rejects
    store.dispatch(
      modalActions.showModal({
        title: '提示',
        content: '不登录无法正常使用~\n\n请允许获取您的用户信息...',
        cancelText: '不了',
        confirmText: '好的',
        onCancel: async () => {
          const res = await Taro.openSetting();
          if (res && res.authSetting['scope.userInfo']) {
            try {
              const reponse = await Taro.getUserInfo();
              userInfo = reponse.userInfo;
            } catch (e) {
              authorized = false;
            }
          } else {
            authorized = false;
          }
        },
        onClose: () => {
          authorized = true;
        },
      })
    );
  }

  if (!authorized) {
    onLoginFailure(new Error('user refuses to authorize, login failed'));
    return;
  }

  userInfo = userInfo || {};
  userInfo.code = code;

  if (isDev) {
    console.group('user info');
    console.log(userInfo);
    console.groupEnd();
  }

  // app login
  try {
    // TODO real api
    const url = `${process.env.API_ROOT}/login`;
    const loginRequest: request.Param = {
      url,
      method: 'GET',
      dataType: 'json',
      data: userInfo,
    };
    const response = await Taro.request<LoginResponse, LoginRequest>(
      loginRequest
    );
    const data = validateStatus(loginRequest, response);

    if (isDev) {
      console.group('login at %s ', url);
      console.log(data);
      console.groupEnd();
    }

    // store token
    Taro.setStorageSync(LOGIN_AUTH_KEY, data.token);

    store.dispatch(
      toastActions.showToast({
        text: '登录成功',
        duration: 1000,
        status: 'success',
        hasMask: true,
      })
    );
  } catch (error) {
    onLoginFailure(error);
  }

  return userInfo;
};
