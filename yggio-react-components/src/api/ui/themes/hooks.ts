/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {toast} from 'react-hot-toast';
import {themesRequests} from '.';
import {getRequestErrorMessage} from '../../../utils';

import type {
  ThemesQuery,
  ThemeCreation,
  ThemeUpdate,
  ThemeDeletion,
} from './types';

const useThemesQuery = ({orgId}: ThemesQuery) => useQuery(
  ['ui', 'themes', orgId],
  async () => themesRequests.get({orgId}),
);

const useCreateThemeMutation = (queryClient: QueryClient) => useMutation(
  async ({data}: ThemeCreation) => themesRequests.create({data}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['ui', 'themes']);
    },
    onError: err => {
      toast.error(getRequestErrorMessage(err));
    },
  },
);

const useUpdateThemeMutation = (queryClient: QueryClient) => useMutation(
  async ({data}: ThemeUpdate) => themesRequests.update({data}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['ui', 'themes']);
    },
    onError: err => {
      toast.error(getRequestErrorMessage(err));
    },
  },
);

const useThemeDeletionMutation = (queryClient: QueryClient) => useMutation(
  async ({data}: ThemeDeletion) => themesRequests.remove({data}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['ui', 'themes']);
    },
  },
);

export {
  useThemesQuery,
  useCreateThemeMutation,
  useUpdateThemeMutation,
  useThemeDeletionMutation,
};
