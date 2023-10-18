import React from 'react';
import _ from 'lodash';

import CursorPagination from '../../../components/cursor-pagination';
import {PAGE_SIZES} from '../constants';
import {
  FooterContainer,
  FooterSideSection,
  PageSizeSelect,
  FooterText,
} from '../styled';
import type {FetchedLog} from '../../../api/logs/requests';
import type {CursorDirection} from '../../../components/cursor-pagination';

interface FooterProps {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  resetPagination: () => void;
  setPageSize: (size: number) => void;
  logs: FetchedLog[];
  handlePaginationClick: (cursorId: string, cursorDirection: CursorDirection, newPage: number) => void;
}

const Footer = (props: FooterProps) => {
  return (
    <FooterContainer>
      <FooterSideSection isHidden />
      <CursorPagination
        currentItemsCount={props.logs.length}
        pageSize={props.pageSize}
        currentPage={props.page}
        nextId={_.last(props.logs)?._id}
        prevId={_.head(props.logs)?._id}
        onChange={props.handlePaginationClick}
      />
      <FooterSideSection>
        <FooterText>Items per page:</FooterText>
        <PageSizeSelect
          value={props.pageSize}
          onChange={evt => {
            const {target: {value}} = evt;
            props.resetPagination();
            props.setPageSize(Number(value));
          }}
        >
          {_.map(PAGE_SIZES, size => (
            <option value={size} key={size}>
              {size}
            </option>
          ))}
        </PageSizeSelect>
      </FooterSideSection>
    </FooterContainer>
  );
};

export default Footer;
