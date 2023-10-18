import _ from 'lodash';
import {AxiosError} from 'axios';

const getRequestErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError<unknown>;
  if (_.isString(axiosError)) {
    return axiosError;
  }
  if (!axiosError.response) {
    return 'No response from server';
  }
  const {status, statusText, data} = axiosError.response;
  if (data) {
    return `${status} - ${data}`;
  }
  if (statusText) {
    return `${status} - ${statusText}`;
  }
  return status.toString();
};

export default getRequestErrorMessage;
