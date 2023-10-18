import React from 'react';
import axios from 'axios';
import {Hydrate, QueryClient, QueryCache, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';

type QueryObject = {dehydratedState: object} & object;

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    if (statusCode === 502) {
      toast.error(`502 Bad gateway - Could not connect to server`);
    } else {
      toast.error(`${statusCode} - ${error?.response?.data}`);
    }
  } else {
    toast.error('Failed to make request - Unknown error');
  }
};

/* Disabling eslint because indent is fine and eslint is wrong */
/* eslint-disable */
const withQueryClientProvider = <T extends QueryObject>(
  Component: React.FC<React.PropsWithChildren<T>>
) => (props: T) => {
  const [queryClient] = React.useState(() => new QueryClient({
    queryCache: new QueryCache({
      // Shows a toaster upon errors
      onError: (error, query) => {
        // @ts-ignore not sure why react-query complains about this
        const numObservers = (query.observers as object[]).length;
        if (!query.meta?.suppressErrorToaster && numObservers) {
          handleError(error);
        }
      }
    })
  }));
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={props.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> 
        <Component {...props} />
      </Hydrate>
      {/* NOTE: When we have removed yggio-message-token toaster should be put here */}
    </QueryClientProvider>
  );
};
/* eslint-enable */

export default withQueryClientProvider;
