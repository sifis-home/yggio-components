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
