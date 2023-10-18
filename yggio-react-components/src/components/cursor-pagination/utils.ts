/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const calculateTotalPages = (pageSize: number, itemCount?: number) => {
  if (!itemCount) {
    return null;
  }
  const totalPages = Math.ceil(itemCount / pageSize);
  return totalPages;
};

interface Params {
  totalPageAmount: number | null;
  currentPage: number;
  pageSize: number;
  currentItemsCount: number;
}

const checkNextButtonShouldBeDisabled = ({totalPageAmount, currentPage, pageSize, currentItemsCount}: Params) => {
  if (totalPageAmount) {
    return currentPage === totalPageAmount;
  }
  return currentItemsCount !== pageSize;
};

export {
  calculateTotalPages,
  checkNextButtonShouldBeDisabled,
};
