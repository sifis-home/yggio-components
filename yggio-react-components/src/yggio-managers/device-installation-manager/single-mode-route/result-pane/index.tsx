/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {NextRouter} from 'next/router';
import {Box} from '@chakra-ui/react';
import Icon from 'react-icons-kit';
import {ic_check_circle_outline as checkCircleIcon} from 'react-icons-kit/md/ic_check_circle_outline';
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
import COLORS from '../../../../constants/colors';

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
          <Icon size={'90'} icon={checkCircleIcon as object} />
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
