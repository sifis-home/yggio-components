import axios, {Method, AxiosRequestConfig, AxiosResponseHeaders, AxiosPromise} from 'axios';
import Bottleneck from 'bottleneck';

import {getConfig} from '../yggio-config';
import {getYggioToken, removeYggioToken} from './token';

interface RequestConfig {
  method: Method;
  URI: string;
  data?: unknown;
  params?: unknown;
  isNextAPI?: boolean;
}

interface BaseRequestResult<R> {
  body: R;
  headers: AxiosResponseHeaders;
}

const limiter = new Bottleneck({minTime: 100});

const DEFAULT_TIMEOUT: number = 15000;

const baseRequest = async <R>(config: RequestConfig): Promise<BaseRequestResult<R>> => {
  try {
    const token = getYggioToken();
    const url = config.isNextAPI
      ? `//${getConfig().domain}/control-panel-v2/api/${config.URI}`
      : `${getConfig().baseRequestUrl}/${config.URI}`;

    const requestConfig: AxiosRequestConfig = {
      headers: token ? {Authorization: `Bearer ${token}`} : undefined,
      timeout: DEFAULT_TIMEOUT,
      withCredentials: true,
      responseType: 'text', // Note: 'json' resulted in text responses not working
      url,
      method: config.method,
      data: config.data,
      params: config.params,
    };

    const result = await limiter.schedule(async () => <AxiosPromise<R>>axios(requestConfig));
    return {
      body: result.data,
      headers: result.headers,
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        removeYggioToken();
      }
      if (err.response?.status === 409) {
        throw err.response.data;
      }
      throw err;
    }
    throw new Error('unknown non-axios error');
  }
};

const request = async <R>(config: RequestConfig) => {
  const result = await baseRequest<R>(config);
  return result.body;
};

const requestHeaders = async <R>(config: RequestConfig) => {
  const result = await baseRequest<R>(config);
  return result.headers;
};

const requestBodyAndHeaders = async <R>(config: RequestConfig) => {
  const result = await baseRequest<R>(config);
  return result;
};

export {
  request,
  requestHeaders,
  requestBodyAndHeaders,
};
