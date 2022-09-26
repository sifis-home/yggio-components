/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'lodash/fp';
import {Icon} from 'react-icons-kit';
import {check as checkIcon} from 'react-icons-kit/fa/check';

import {withYggio} from '../../../yggio-context';
import {withState} from '../../../hocs';
import Button from '../../../components/button';
import {FlexWrapper, CenterContentContainer} from '../../../global/styled';
import state from './state';
import {
  InputWrapper,
  InputPrepender,
} from './styled';
import ContainerBox from '../../../components/container-box';
import {withEvents} from '../../../hocs';
import events from './events';
import TextField from '../../../components/text-field';
import NumberField from '../../../components/number-field';

const LocationCreator = (props) => {

  return (
    <CenterContentContainer>
      <ContainerBox
        position={'relative'}
        display={'flex'}
        width={'30%'}
        height={'100%'}
        flexDirection={'column'}
        margin={'10px'}
        includeMarginInHeight
        includeMarginInWidth
      >
        <InputWrapper>
          <InputWrapper>
            <TextField
              label={'Name'}
              placeholder={'e.g Street 101'}
              name={'name'}
              height={'30px'}
              width={'100%'}
              value={_.get(props.formInputs, 'name.value', '')}
              onChange={props.handleValueChange}
            />
            <InputPrepender
              isValid={_.get(props.formInputs, 'name.validation.isValid')}
            >
              <Icon icon={checkIcon} size={20} />
            </InputPrepender>
          </InputWrapper>

          <InputWrapper>
            <TextField
              label={'Description'}
              placeholder={'e.g This is the property of Street 101'}
              name={'desc'}
              height={'30px'}
              width={'100%'}
              value={_.get(props.formInputs, 'desc.value', '')}
              onChange={props.handleValueChange}
            />
            <InputPrepender
              isValid={_.get(props.formInputs, 'desc.validation.isValid')}
            >
              <Icon icon={checkIcon} size={20} />
            </InputPrepender>
          </InputWrapper>

          <InputWrapper>
            <NumberField
              label={'Latitude'}
              name={'lat'}
              height={'30px'}
              width={'100%'}
              value={_.get(props.formInputs, 'lat.value', 0)}
              onChange={props.handleValueChange}
            />
            <InputPrepender
              isValid={_.get(props.formInputs, 'lat.validation.isValid')}
            >
              <Icon icon={checkIcon} size={20} />
            </InputPrepender>
          </InputWrapper>

          <InputWrapper>
            <NumberField
              label={'Longitude'}
              name={'lng'}
              height={'30px'}
              width={'100%'}
              value={_.get(props.formInputs, 'lng.value', 0)}
              onChange={props.handleValueChange}
            />
            <InputPrepender
              isValid={_.get(props.formInputs, 'lng.validation.isValid')}
            >
              <Icon icon={checkIcon} size={20} />
            </InputPrepender>
          </InputWrapper>

          <FlexWrapper style={{justifyContent: 'space-between'}}>
            <Button
              margin={'10px'}
              content={'Cancel'}
              onClick={() => props.router.push('/locations')}
            />
            <FlexWrapper>
              <Button
                margin={'10px'}
                content={'Reset'}
                onClick={props.clearForm}
              />
              <Button
                margin={'10px'}
                color={'green'}
                content={'Create'}
                onClick={props.handleCreateLocation}
              />
            </FlexWrapper>
          </FlexWrapper>
        </InputWrapper>
      </ContainerBox>
    </CenterContentContainer>
  )
};

LocationCreator.propTypes = {
  createLocation: PropTypes.func,
};

const yggio = {
  mapYggioStateToProps: yggioState => ({
  }),
  mapYggioActionsToProps: yggioActions => ({
    createLocation: yggioActions.apiState.locations.create,
  }),
};

export default compose(
  withYggio(yggio),
  withState(state),
  withEvents(events),
)(LocationCreator);
