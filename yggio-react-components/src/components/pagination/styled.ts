/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import ReactPagination from 'rc-pagination';
import styled from 'styled-components';
import {COLORS} from '../../constants';

const StyledPagination = styled(ReactPagination)`
  display: flex;
  list-style-type: none;

  margin: ${({margin}: {margin?: string}) => margin || 0};
  padding: 0;

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &::after {
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    content: ' ';
  }

  .rc-pagination-total-text {
    display: inline-block;
    height: 28px;
    margin-right: 8px;
    vertical-align: middle;
  }

  .rc-pagination-item {
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 26px;
    height: 26px;
    margin-right: 2px;
    text-align: center;
    vertical-align: middle;
    list-style: none;
    background-color: ${COLORS.trueWhite};
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    outline: 0;
    cursor: pointer;
    user-select: none;

    a {
      display: block;
      padding: 0 6px;
      color: rgba(0, 0, 0, 0.85);
      transition: none;

      &:hover {
        text-decoration: none;
      }
    }

    &:focus,
    &:hover {
      border-color: #1890ff;
      transition: all 0.3s;

      a {
        color: #1890ff;
      }
    }
  }

  .rc-pagination-item-active {
    font-weight: 500;
    background: ${COLORS.trueWhite};
    border-color: #1890ff;

    a {
      color: #005eb5;
    }

    &:focus,
    &:hover {
      border-color: #40a9ff;
    }

    &:focus a,
    &:hover a {
      color: #40a9ff;
    }
  }

  .rc-pagination-jump-prev,
  .rc-pagination-jump-next {
    outline: 0;

    button {
      background: transparent;
      border: none;
      cursor: pointer;
      color: #666;
    }

    button:after {
      display: block;
      content: '•••';
    }
  }

  .rc-pagination-prev,
  .rc-pagination-jump-prev,
  .rc-pagination-jump-next {
    margin-right: 2px;
    outline: 0;
  }

  .rc-pagination-prev,
  .rc-pagination-next,
  .rc-pagination-jump-prev,
  .rc-pagination-jump-next {
    display: inline-block;
    min-width: 26px;
    height: 26px;
    border: 1px solid #d9d9d9;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
    vertical-align: middle;
    list-style: none;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      border-color: #40a9ff;
    }
  }

  .rc-pagination-prev,
  .rc-pagination-next {
    outline: 0;

    button {
      color: rgba(0, 0, 0, 0.85);
      cursor: pointer;
      user-select: none;
      border: 0;
    }

    &:hover button {
      border-color: #40a9ff;
    }

    &.rc-pagination-item-link {
      display: block;
      width: 100%;
      height: 100%;
      font-size: 12px;
      text-align: center;
      background-color: ${COLORS.trueWhite};
      border-radius: 2px;
      outline: none;
    }



    &:focus .rc-pagination-item-link,
    &:hover .rc-pagination-item-link {
      color: #40a9ff;
      border-color: #40a9ff;
    }
  }

  .rc-pagination-disabled {
    &,
    &:hover,
    &:focus {
      cursor: not-allowed;

      .rc-pagination-item-link {
        color: fade(#000, 25%);
        border-color: #d9d9d9;
        cursor: not-allowed;
      }
    }
  }

  .rc-pagination-slash {
    margin: 0 10px 0 5px;
  }

  .rc-pagination-options {
    display: none;
  }

  .rc-pagination-simple .rc-pagination-prev,
  .rc-pagination-simple .rc-pagination-next {
    height: 24px;
    vertical-align: top;

    .rc-pagination-item-link {
      height: 24px;
      background-color: transparent;
      border: 0;

      &::after {
        height: 24px;
      }
    }
  }

  .rc-pagination-simple .rc-pagination-simple-pager {
    display: inline-block;
    height: 24px;
    margin: 8px;

    input {
      box-sizing: border-box;
      height: 100%;
      margin-right: 8px;
      padding: 0 6px;
      text-align: center;
      background-color: ${COLORS.trueWhite};
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      outline: none;
      transition: border-color 0.3s;

      &:hover {
        border-color: #1890ff;
      }
    }
  }

  // ============================ Disabled ============================
  &.rc-pagination-disabled {
    cursor: not-allowed;

    .rc-pagination-item {
      background: hsv(0, 0, 96%);
      border-color: #d9d9d9;
      cursor: not-allowed;

      a {
        color: fade(#000, 25%);
        background: transparent;
        border: none;
        cursor: not-allowed;
      }

      .rc-pagination-active {
        background: darken(hsv(0, 0, 96%), 10%);
        border-color: transparent;

        a {
          color: ${COLORS.trueWhite};
        }
      }
    }

    .rc-pagination-item-link {
      color: fade(#000, 25%);
      background: hsv(0, 0, 96%);
      border-color: #d9d9d9;
      cursor: not-allowed;
    }

    .rc-pagination-item-link-icon {
      opacity: 0;
    }

    .rc-pagination-item-ellipsis {
      opacity: 1;
    }
  }
}
`;

export {
  StyledPagination,
};
