/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {useMemo} from 'react';

/**
 * The useSelector hook can be used to handle expensive functions and computations.
 * It does a "deep equality check" by JSON stringifying the state objects and
 * comparing for memoization.
 * @param state {Object} state object to be used in the selector
 * @param selector {Function} the selector function
 * @returns {*} the selected state memoized
 */
const useSelector = (state, selector) => (
  useMemo(() => selector(state), [state, selector])
);

export default useSelector;
