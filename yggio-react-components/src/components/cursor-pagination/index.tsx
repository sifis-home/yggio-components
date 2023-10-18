/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {useTranslation} from 'react-i18next';
import {Flex, Box} from '@chakra-ui/react';

import {PaginationButton} from './styled';
import {calculateTotalPages, checkNextButtonShouldBeDisabled} from './utils';

type CursorDirection = 'next' | 'prev';

interface CursorPaginationProps {
  totalItemsCount?: number;
  currentItemsCount: number;
  nextId?: string;
  prevId?: string;
  pageSize: number;
  currentPage: number;
  onChange(cursorId: string, cursorDirection: CursorDirection, newPage: number): void;
}

const CursorPagination = (props: CursorPaginationProps) => {
  const {t} = useTranslation();

  const totalPageAmount = calculateTotalPages(props.pageSize, props.totalItemsCount);

  const nextButtonShouldBeDisabled = checkNextButtonShouldBeDisabled({
    totalPageAmount,
    currentPage: props.currentPage,
    pageSize: props.pageSize,
    currentItemsCount: props.currentItemsCount
  });

  const handlePageChange = (cursorDirection: CursorDirection) => {
    if (props.currentItemsCount === 0) {
      return null;
    }

    if (
      cursorDirection === 'next' &&
      props.currentPage !== props.currentItemsCount - 1 &&
      props.nextId
    ) {
      const nextPage = props.currentPage + 1;
      props.onChange(props.nextId, cursorDirection, nextPage);
    }

    if (cursorDirection === 'prev' && props.currentPage !== 1 && props.prevId) {
      const prevPage = props.currentPage - 1;
      props.onChange(props.prevId, cursorDirection, prevPage);
    }
  };

  return (
    <Flex m='5px'>
      <PaginationButton
        onClick={() => handlePageChange('prev')}
        disabled={props.currentPage === 1}
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
        title={t('pagination.prev_page')}
        /* eslint-enable @typescript-eslint/no-unsafe-assignment */
      >
        {'<'}
      </PaginationButton>
      <Box m='5px'>
        {totalPageAmount
          ? `${props.currentPage} / ${totalPageAmount}`
          : `Page ${props.currentPage}`
        }
      </Box>
      <PaginationButton
        onClick={() => handlePageChange('next')}
        disabled={nextButtonShouldBeDisabled}
        /* eslint-disable @typescript-eslint/no-unsafe-assignment */
        title={t('pagination.next_page')}
        /* eslint-enable @typescript-eslint/no-unsafe-assignment */
      >
        {'>'}
      </PaginationButton>
    </Flex>
  );
};

export default CursorPagination;
export type {
  CursorDirection,
};
