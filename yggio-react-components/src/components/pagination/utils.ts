/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/* eslint-disable camelcase */
const handlePaginationLocale = (t: (key: string) => string) => ({
  items_per_page: t('pagination.items_per_page'),
  jump_to: t('pagination.jump_to'),
  jump_to_confirm: t('pagination.jump_to_confirm'),
  page: t('pagination.page'),
  prev_page: t('pagination.prev_page'),
  next_page: t('pagination.next_page'),
  prev_5: t('pagination.prev_5'),
  next_5: t('pagination.next_5'),
  prev_3: t('pagination.prev_3'),
  next_3: t('pagination.next_3'),
});

export {
  handlePaginationLocale,
};
