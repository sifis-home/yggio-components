/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {compose} from 'lodash/fp';
import {Icon} from 'react-icons-kit';
import {check as checkIcon} from 'react-icons-kit/fa/check';
import _ from 'lodash';
import {withYggio} from '../../../yggio-context';
import {withEvents, withReselect, withState} from '../../../hocs';
import Button from '../../../components/button';
import TextField from '../../../components/text-field';
import {FlexWrapper, CenterContentContainer} from '../../../global/styled';
import {
  InputWrapper,
  InputPrepender,
} from './styled';
import ContainerBox from '../../../components/container-box';
import selectors from './selectors';
import events from './events';
import state from './state';
import TextArea from '../../../components/text-area';

const LocationEditor = (props) => {
  React.useEffect(() => {
    props.fetchLocations();
  }, []);
  //
  React.useEffect(() => {
    if (props.currentLocation) {
      props.setInputValue('name', _.get(props, 'currentLocation.name'));
      props.setInputValue('description', _.get(props, 'currentLocation.description'));
    }
  }, [props.currentLocation]);

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
              placeholder={'e.g Street 101'}
              label={'Name'}
              name={'name'}
              valid={_.get(props.formInputs, 'name.validation.isValid')}
              value={_.get(props.formInputs, 'name.value', '')}
              onChange={props.handleValueChange}
            />
            <InputPrepender
              isValid={_.get(props.formInputs, 'name.validation.isValid')}
            >
              <Icon icon={checkIcon} size={20}/>
            </InputPrepender>
          </InputWrapper>

          <InputWrapper>
            <TextArea
              placeholder={'e.g Street 101'}
              label={'Description'}
              name={'description'}
              valid={_.get(props.formInputs, 'description.validation.isValid')}
              value={_.get(props.formInputs, 'description.value', '')}
              onChange={props.handleValueChange}
            />
          </InputWrapper>

          <FlexWrapper style={{justifyContent: 'space-between'}}>
            <Button
              margin={'5px'}
              content={'Cancel'}
              onClick={() => props.router.push('/locations')}
            />
            <Button
              margin={'5px'}
              color={'green'}
              content={'Save'}
              onClick={props.handleLocationEdit}
            />
          </FlexWrapper>
        </InputWrapper>
      </ContainerBox>
    </CenterContentContainer>
  )
};

LocationEditor.propTypes = {
};

const yggio = {
  mapYggioStateToProps: yggioState => ({
    locations: yggioState.database.locations,
  }),
  mapYggioActionsToProps: yggioActions => ({
    fetchLocations: yggioActions.database.locations.fetchLocations,
    updateLocation: yggioActions.database.locations.updateLocation,
  }),
};

export default compose(
  withYggio(yggio),
  withState(state),
  withReselect(selectors),
  withEvents(events),
)(LocationEditor)
