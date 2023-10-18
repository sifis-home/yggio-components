import React from 'react';
import {useTranslation} from 'react-i18next';

import {StyledPagination} from './styled';
import {JUMP_ICON} from './constants';
import {handlePaginationLocale} from './utils';

interface PaginationProps {
  totalItemsCount: number;
  pageSize: number;
  page: number;
  margin?: string;
  onChange(id: number): void;
}

const Pagination = (props: PaginationProps) => {
  const {t} = useTranslation();

  return (
    <StyledPagination
      locale={handlePaginationLocale(t)}
      pageSize={props.pageSize}
      current={props.page}
      total={props.totalItemsCount}
      onChange={props.onChange}
      showLessItems
      jumpPrevIcon={JUMP_ICON}
      jumpNextIcon={JUMP_ICON}
      margin={props.margin}
    />
  );
};

export default Pagination;
