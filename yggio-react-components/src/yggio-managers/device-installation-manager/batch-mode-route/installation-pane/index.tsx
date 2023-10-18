import React from 'react';
import {NextRouter} from 'next/router';
import {useQueryClient} from '@tanstack/react-query';

import BatchOperationView from '../../../../yggio-connected-components/batch-operation-view';
import {jobApi} from '../../../../api';
import {StyledContainerBox} from '../../sub-components';

interface InstallationPaneProps {
  jobId?: string;
  uploadItems: Record<string, string>[];
  router: NextRouter;
}

const InstallationPane = (props: InstallationPaneProps) => {

  const jobQuery = jobApi.useJob(props.jobId);

  const queryClient = useQueryClient();

  const onDoneClick = async () => {
    await queryClient.invalidateQueries(['devices']);
    await props.router.push('/devices');
  };

  return (
    <StyledContainerBox>
      <BatchOperationView
        job={jobQuery.data}
        items={props.uploadItems}
        onDoneClick={onDoneClick}
        progressHeading='Creating devices...'
        successesText='devices were successfully created'
        errorsText='devices failed to get created'
      />
    </StyledContainerBox>
  );
};

export default InstallationPane;
