/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState, useEffect} from 'react';
import {formatDistance, differenceInSeconds} from 'date-fns';
import {RefreshNote} from '../styled';

/*
  NOTE:
  The useEffect is used to trigger a rerender
  which is required to keep the text up to date
  Is put into a own component to minimize what needs to be rerendered
*/
const LastUpdatedNote = ({lastUpdated}: {lastUpdated: number}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setTimeout(() => setCurrentDate(new Date()), 10000);
  }, [currentDate]);

  const lastUpdatedDate = new Date(lastUpdated);
  const diff = differenceInSeconds(currentDate, lastUpdatedDate);
  if (diff < 10) {
    return (
      <RefreshNote>Last updated just now</RefreshNote>
    );
  }
  const formatedDistance = formatDistance(currentDate, lastUpdatedDate);
  return (
    <RefreshNote>Last updated {formatedDistance} min ago</RefreshNote>
  );
};

export default LastUpdatedNote;
