import Taro, { request } from '@tarojs/taro';

export type ExceptionLogger = boolean | ((info: any) => void);

export interface HttpException extends Error {
  meta?: any;
}

// TODO a real logger

export const logException = async (
  error: HttpException,
  logger: ExceptionLogger
) => {
  let systemInfo;
  try {
    systemInfo = await Taro.getSystemInfo();
  } catch (error) {
    systemInfo = 'failed to fetch system info';
  }

  error.meta = error.meta || {};
  error.meta.systemInfo = systemInfo;

  if (logger === true) {
    defaultExceptionLogger(error);
  } else if (typeof logger === 'function') {
    logger(error);
  }

  return error;
};

export const commonExceptionFactory = async ({
  message,
  meta,
  logger = true,
}: {
  message: string;
  meta?: any;
  logger?: ExceptionLogger;
}) => {
  const error: HttpException = new Error(message);
  error.meta = meta;

  if (typeof logger !== 'undefined') {
    if (process.env.NODE_ENV === 'development') {
      logException(error, logger);
    }
  }

  return error;
};

export const defaultExceptionLogger = async (error: HttpException) => {
  console.group('%c %s', 'color: red;', error.name);
  console.error(error);
  console.log(error.meta);
  console.groupEnd();
};

export const defaultDataTransformer: (any) => any = data => data;

export const validateStatus = <T extends any = any>(
  req: request.Param,
  res: request.Promised<T>
) => {
  const { statusCode = 200, data } = res;

  // network failure
  if (statusCode < 200 || statusCode >= 300) {
    throw commonExceptionFactory({
      message: `系统错误(${statusCode}`,
      meta: {
        request: req,
        status: statusCode,
      },
    });
  }

  return data;
};
