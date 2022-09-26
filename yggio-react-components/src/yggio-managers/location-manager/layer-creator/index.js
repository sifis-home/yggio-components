/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {compose} from 'lodash/fp';
import {Icon} from 'react-icons-kit';
import {check as checkIcon} from 'react-icons-kit/fa/check';

import {withYggio} from '../../../yggio-context';
import {withState, withEvents} from '../../../hocs';
import Button from '../../../components/button';
import TextField from '../../../components/text-field';
import {FlexWrapper, CenterContentContainer} from '../../../global/styled';
import state from './state';
import {
  InputWrapper,
  Label,
  InputPrepender,
} from './styled';
import ContainerBox from '../../../components/container-box';
import events from './events';

const LayerCreator = (props) => {
  React.useEffect(() => {
    props.getLocation(props.locationId);
  }, []);

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

          <FlexWrapper style={{justifyContent: 'space-between'}}>
            <Button
              margin={'5px'}
              content={'Cancel'}
              onClick={() => props.router.push(`/locations/${props.locationId}/${_.get(props.location, 'res.defaultLayer._id')}`)}
            />
            <FlexWrapper>
              <Button
                margin={'5px'}
                content={'Reset'}
                onClick={props.clearForm}
              />
              <Button
                color={'green'}
                margin={'5px'}
                content={'Create'}
                onClick={props.handleLayerCreation}
              />
            </FlexWrapper>
          </FlexWrapper>

        </InputWrapper>
      </ContainerBox>
    </CenterContentContainer>
  )
};

LayerCreator.propTypes = {
  createLayer: PropTypes.func,
  layer: PropTypes.object,
  setLayerData: PropTypes.func,
  resetLayerData: PropTypes.func
};

const yggio = {
  mapYggioStateToProps: yggioState => ({
    location: yggioState.apiState.locations.get,
  }),
  mapYggioActionsToProps: yggioActions => ({
    updateLocation: yggioActions.apiState.locations.update,
    getLocation: yggioActions.apiState.locations.get,
  }),
};

export default compose(
  withYggio(yggio),
  withState(state),
  withEvents(events),
)(LayerCreator)
