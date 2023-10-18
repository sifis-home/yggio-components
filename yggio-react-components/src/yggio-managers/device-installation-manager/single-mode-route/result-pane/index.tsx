import React from 'react';
import {NextRouter} from 'next/router';
import {Box} from '@chakra-ui/react';
import {MdCheckCircle as CheckCircleIcon} from 'react-icons/md';

import Button from '../../../../components/button';
import InfoBox from '../../../../components/info-box';
import {
  ContentContainer,
  SuccessMessage,
} from './styled';
import {UpdateLocationMutation} from '../types';
import {FormInputs} from '../../../../types';
import {NavButtonsContainer} from '../../styled';
import {StyledContainerBox} from '../../sub-components';
import {COLORS} from '../../../../constants';

interface ResultPaneProps {
  router: NextRouter;
  detailsFormInputs: FormInputs;
  updateLocationMutation: UpdateLocationMutation;
}

const ResultPane = (props: ResultPaneProps) => {
  return (
    <StyledContainerBox>
      <ContentContainer>
        <Box color={COLORS.greenAlt}>
          <CheckCircleIcon size={70} />
        </Box>
        <SuccessMessage>Device was added successfully</SuccessMessage>
        {props.updateLocationMutation.isError && (
          <InfoBox
            type={'warning'}
            heading={'Device was created but could not be added to location'}
            content={`Error: ${props.updateLocationMutation.error}`}
            margin={'30px 0 0 0'}
          />
        )}
      </ContentContainer>
      <NavButtonsContainer flexDirection={'row-reverse'}>
        <Button
          content={'Done'}
          ghosted
          onClick={async () => props.router.push('/devices')}
        />
      </NavButtonsContainer>
    </StyledContainerBox>
  );
};

export default ResultPane;
