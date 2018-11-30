import Taro, { request } from '@tarojs/taro';

export interface ErrorMeta {
  // if this error has already been handled properly
  // (so that can be ignored safely when thrown again)
  handled?: boolean;
  logger?: ((info: Error) => void);
}

export class HandledError extends Error {
  readonly name: string;

  static getSystemInfo = () => {
    let systemInfo;
    try {
      systemInfo = Taro.getSystemInfoSync();
    } catch (error) {
      systemInfo = 'failed to fetch system info';
    }

    return systemInfo;
  };

  constructor(
    message = '',
    public meta: ErrorMeta = {
      handled: false,
    }
  ) {
    super(message);

    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, HandledError.prototype); // restore prototype chain

    this.name = this.constructor.name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HandledError);
    }
  }

  logError = () => {
    if (process.env.NODE_ENV === 'development') {
      this.logErrorDev();
    } else {
      // TODO
    }
  };

  logErrorDev = () => {
    console.group('%c [%s]', 'color: red;', this.name);
    console.error(this);
    console.log(HandledError.getSystemInfo());
    console.groupEnd();
  };
}

export class HTTPError extends HandledError {
  constructor(
    message = '',
    public statusCode: number | string = 'NO CODE',
    public meta: ErrorMeta & { request?: request.Param } = {
      handled: false,
    }
  ) {
    super(message, meta);

    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
    Object.setPrototypeOf(this, HTTPError.prototype); // restore prototype chain

    this.statusCode = statusCode;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError);
    }
  }

  logErrorDev = () => {
    console.group(
      '%c [%s] %c [%s]',
      'color: red;',
      this.name,
      'color: salmon;',
      this.statusCode
    );
    console.error(this);
    if (this.meta.request) {
      console.log(this.meta.request);
    }
    console.log(HTTPError.getSystemInfo());
    console.groupEnd();
  };
}
