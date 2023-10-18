import {useQuery, useQueries, useMutation, QueryClient} from '@tanstack/react-query';
import _ from 'lodash';
import {toast} from 'react-hot-toast';
import {viewRequests} from '.';
import {getRequestErrorMessage} from '../../../utils';
import {
  ViewCreation,
  ViewIdQuery,
  ViewUpdateQuery,
  ViewQuery,
  ViewQueries,
  View,
} from '../../../types';


const useViewsQuery = <T = View[]>({type, orgId}: ViewQuery) => useQuery(
  ['ui', 'views', type, orgId],
  async () => viewRequests.get<T>({type, orgId}),
);

const useViewsQueries = <T = View[]>({type, orgIds}: ViewQueries) => useQueries({
  queries: _.map(orgIds, orgId => ({
    queryKey: ['ui', 'views', type, orgId],
    queryFn: async () => viewRequests.get<T>({type, orgId}),
  })),
});

const useCreateViewMutation = (queryClient: QueryClient) => useMutation(
  async (data: ViewCreation) => viewRequests.create(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['ui', 'views']);
    },
    onError: err => {
      toast.error(getRequestErrorMessage(err));
    },
  },
);

const useUpdateViewMutation = (queryClient: QueryClient) => useMutation(
  async ({_id, data, type}: ViewUpdateQuery) => viewRequests.update({_id, data, type}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['ui', 'views']);
    },
    onError: err => {
      toast.error(getRequestErrorMessage(err));
    },
  },
);

const useViewDeletionMutation = (queryClient: QueryClient) => useMutation(
  async ({_id}: ViewIdQuery) => viewRequests.remove({_id}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['ui', 'views']);
    },
  },
);

export {
  useViewsQuery,
  useViewsQueries,
  useCreateViewMutation,
  useUpdateViewMutation,
  useViewDeletionMutation,
};
