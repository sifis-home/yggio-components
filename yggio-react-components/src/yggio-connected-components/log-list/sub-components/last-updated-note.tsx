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
