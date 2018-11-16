import Taro, { request } from '@tarojs/taro';
// import { CANCEL  } from 'redux-saga';

import { store } from '../store/configureStore';
import { toastActions, toastModels } from '../store/ui/toast';
import { login, LOGIN_AUTH_KEY } from './login';
import {
  // logException,
  commonExceptionFactory,
  validateStatus,
  defaultDataTransformer,
} from './util';

export type ExtraApiConfig = Partial<{
  tranformData: boolean | ((any) => any);
  needValidation: boolean;
  needAuth: boolean;
  showError: boolean | string | object;
  showLoading: boolean | string | object;
  showIndicator: boolean;
}>;

export type ApiConfig<U> = string | (request.Param<U> & ExtraApiConfig);

const isDev = process.env.NODE_ENV === 'development';

export const callApi = async <T extends any = any, U extends any = any>(
  config: ApiConfig<U>
) => {
  if (typeof config === 'string') {
    config = {
      url: config,
    };
  }

  const {
    tranformData,
    needValidation = true,
    needAuth = true,
    showError = true,
    showLoading = false,
    showIndicator = true,
    ...httpRequest
  } = config;

  if (needAuth) {
    try {
      const token = Taro.getStorageSync(LOGIN_AUTH_KEY);

      if (!token) {
        await login();
      }

      // try {
      //   await Taro.checkSession();
      // } catch (error) {
      //   logException(error, true);
      //   await login();
      // }

      if (!httpRequest.data) {
        httpRequest.data = {} as U;
      }
      httpRequest.data.token = token;
    } catch (error) {
      throw commonExceptionFactory({
        message: 'auth checke failed',
        meta: error,
      });
    }
  }

  if (showLoading) {
    let loadingConfig: toastModels.ToastPayload = {
      status: 'loading',
      duration: 0,
    };

    if (typeof showLoading === 'object') {
      loadingConfig = {
        ...showLoading,
        ...loadingConfig,
      };
    } else if (typeof showLoading === 'string') {
      loadingConfig.text = showLoading;
    } else {
      loadingConfig.text = '加载中...';
    }

    store.dispatch(toastActions.showToast(loadingConfig));
  }

  if (showIndicator) {
    Taro.showNavigationBarLoading();
  }

  if (isDev) {
    console.group(`%s url "%s"`, config.method || 'GET', config.url);
    console.log(config);
    console.groupEnd();
  }

  try {
    let data: T;
    const requestTask: Promise<request.Promised<T>> = Taro.request<T, U>(
      httpRequest
    );
    // requestTask[CANCEL] = requestTask.abort();

    const response = await requestTask;
    if (needValidation) {
      data = validateStatus<T>(httpRequest, response);
    } else {
      data = response.data;
    }

    if (tranformData === true) {
      data = defaultDataTransformer(data);
    } else if (typeof tranformData === 'function') {
      data = tranformData(data);
    }

    if (isDev) {
      console.group('response');
      console.log(response);
      console.groupEnd();
    }

    return data;
  } catch (error) {
    if (showError) {
      let errorConfig: toastModels.ToastPayload = {
        duration: 2000,
        status: 'error',
        hasMask: true,
      };

      if (typeof showError === 'object') {
        errorConfig = {
          ...showError,
          ...errorConfig,
        };
      } else if (typeof showError === 'string') {
        errorConfig.text = showError;
      } else {
        errorConfig.text = 'Unknown error';
      }

      store.dispatch(toastActions.showToast(errorConfig));
    }

    throw commonExceptionFactory({
      message: error.message,
      meta: error,
    });
  } finally {
    if (showLoading) {
      store.dispatch(toastActions.hideToast());
    }

    if (showIndicator) {
      Taro.hideNavigationBarLoading();
    }
  }
};
