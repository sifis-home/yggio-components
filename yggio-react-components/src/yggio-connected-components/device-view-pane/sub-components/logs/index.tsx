import React from 'react';

import LogList from '../../../log-list';

interface LogsProps {
  deviceId: string;
}

const Logs = (props: LogsProps) => {
  return (
    <LogList resourceId={props.deviceId} />
  );
};

export default Logs;
