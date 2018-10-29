import Taro, { request } from '@tarojs/taro';

import { store } from '../store/configureStore';
import { toastActions, toastModels } from '../store/ui/toast';
import { login } from './login';
import {
  logException,
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

export type ApiConfig = string | (request.Param & ExtraApiConfig);

const isDev = process.env.NODE_ENV === 'development';

export const callApi = async (config: ApiConfig) => {
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
    showLoading = true,
    showIndicator = true,
    ...httpRequest
  } = config;

  if (needAuth) {
    try {
      const token = store.getState().auth.user.authToken;

      if (!token) {
        await login();
      }

      try {
        await Taro.checkSession();
      } catch (error) {
        logException(error, true);
        await login();
      }

      if (!httpRequest.data) {
        httpRequest.data = {};
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
    console.group(`%s url "%s"`, config.method, config.url);
    console.log(config);
    console.groupEnd();
  }

  try {
    let data;
    const response = await Taro.request(httpRequest);
    if (needValidation) {
      data = validateStatus(httpRequest, response);
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
