import React from 'react';

import ContainerBox from '../../../components/container-box';
import LogList from '../../log-list';
import {LogsWrapper, LogsHeading} from '../styled';

const Logs = () => {
  return (
    <LogsWrapper>
      <ContainerBox
        width={'100%'}
        minHeight={'400px'}
      >
        <LogsHeading>Latest device activity</LogsHeading>
        <LogList
          showOnlyList
          pageSize={5}
        />
      </ContainerBox>
    </LogsWrapper>
  );
};

export default Logs;
