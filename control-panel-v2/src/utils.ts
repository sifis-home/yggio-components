import _ from 'lodash';
import jwt from 'jsonwebtoken';
import z from 'zod';
import {isYggioError, types} from 'yggio-errors';

const getAuthUser = (authToken: string) => {
  if (!authToken) {
    return null;
  }
  const decoded = jwt.decode(authToken, {complete: true});
  if (!decoded) {
    throw new Error('Invalid auth token');
  }
  return decoded.payload.sub as string;
};

interface CustomError extends Error {
  code?: number;
}

const handleAPIErrors = (err: unknown) => {
  if (err instanceof z.ZodError) {
    const firstError = err.issues[0];
    return {
      status: 422,
      message: `${_.join(firstError.path)}: ${firstError.message}`,
    };
  }

  if (isYggioError(err)) {
    const yggioError = err as types.YggioError;
    return {
      status: yggioError.deriveHTTPResponse().statusCode,
      message: yggioError.publicMessage,
    };
  }

  const customError = err as CustomError;
  if (err instanceof Error) {
    if (customError.name === 'MongoServerError' && customError.code === 11000) {
      return {
        status: 409,
        message: 'Duplicate key error',
      };
    }
  }
  return {
    status: 500,
    message: customError.message,
  };
};

export {
  getAuthUser,
  handleAPIErrors,
};
