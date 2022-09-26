/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {AxiosError} from 'axios';
import {QueryClient, QueryCache, QueryClientProvider} from '@tanstack/react-query';
// import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // Shows a toaster upon errors
    onError: (error, query) => {
      // @ts-ignore not sure why react-query complains about this
      const numObservers = (query.observers as object[]).length;
      if (!query.meta?.suppressErrorToaster && numObservers) {
        toast.error(`${(error as AxiosError)?.response?.status} - ${(error as AxiosError)?.response?.data}`);
      }
    }
  })
});

/* Disabling eslint because indent is fine and eslint is wrong */
/* eslint-disable */
const withQueryClientProvider = <T extends object>(
  Component: React.FC<React.PropsWithChildren<T>>
) => (props: T) => (
  <QueryClientProvider client={queryClient}>
    {/* FIXME: TEMP disabling of react query devtools (not currently working) */}
    {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
    <Component {...props} />
    {/* NOTE: When we have removed yggio-message-token toaster should be put here */}
  </QueryClientProvider>
);
/* eslint-enable */

export default withQueryClientProvider;
