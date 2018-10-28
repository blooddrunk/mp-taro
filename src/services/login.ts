import Taro, { request } from '@tarojs/taro';

import { store } from '../store/configureStore';
import { toastActions } from '../store/ui/toast';
import { authActions, authModels } from '../store/auth';
import { validateStatus } from './util';

const isDev = process.env.NODE_ENV === 'development';

export type LoginRequest = authModels.User & {
  code?: string;
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
    // TODO use taro-ui
    const { cancel } = await Taro.showModal({
      title: '提示',
      content: '不登录无法正常使用~\n\n请允许获取您的用户信息...',
      cancelText: '好的',
      cancelColor: '#f9635f',
      confirmText: '不了',
      confirmColor: '#666666',
    });

    // user rejects again
    if (cancel) {
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
    } else {
      authorized = false;
    }
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
    const response = await Taro.request(loginRequest);
    const data = validateStatus(loginRequest, response);

    if (isDev) {
      console.group('login at %s ', url);
      console.log(data);
      console.groupEnd();
    }

    store.dispatch(authActions.setAuthToken(data));

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