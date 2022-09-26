/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// memoized-inputs-checker

const memoizedInputsChecker = equalityCheck => {
  // the mutable state
  let prevValue = null;
  // and the memoized equality check
  const checkInputs = currValue => {
    const isUnchanged = equalityCheck
      ? equalityCheck(currValue, prevValue)
      : currValue === prevValue;
    if (isUnchanged) {
      return true;
    }
    prevValue = currValue;
    return false;
  };
  return checkInputs;
};

export default memoizedInputsChecker;
