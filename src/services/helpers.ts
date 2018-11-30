import { request } from '@tarojs/taro';

import { HTTPError } from '../utils/errors';

export const defaultDataTransformer: (any) => any = data => data;

export const validateStatus = <T extends any = any>(
  req: request.Param,
  res: request.Promised<T>
) => {
  const { statusCode = 200, data } = res;

  // network failure
  if (statusCode < 200 || statusCode >= 300) {
    throw new HTTPError(`系统错误(${statusCode})`, statusCode, {
      request: req,
    });
  }

  return data;
};
