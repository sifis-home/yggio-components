/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {useQueryClient} from '@tanstack/react-query';

import {compose} from 'lodash/fp';
import events from './events';
import Button from '../../../../components/button';
import Select from '../../../../components/select';
import {withEvents, withState, withLanguage} from '../../../../hocs';
import {formState} from './state';
import {withRouteCheck} from './effects';
import ContainerBox from '../../../../components/container-box';
import {Info} from './styled';
import {FlexSpaceBetweenWrapper} from '../../../../global/styled';
import {CenteredPage} from '../../../../global/components';
import {devicesApi} from '../../../../api';
import {selectDeviceOptions} from './selectors';
import {handleExit} from './utils';

const BasicToolsPane = props => {
  const queryClient = useQueryClient();

  const {mutateAsync: mutateDevice} = devicesApi.useUpdateDevice(queryClient);

  const devices = devicesApi.useConnectorsDevicesQuery();
  const deviceOptions = selectDeviceOptions({devices});

  const handleSetConnector = async () => {
    const updatedDevices = _.map(props.selectedDevices, deviceId => {
      mutateDevice({
        deviceId,
        updates: {connector: _.get(props, 'formInputs.setConnectorId.value')},
      });
    });
    await Promise.all(updatedDevices);
    handleExit(props);
  };

  return (
    <CenteredPage>
      <ContainerBox>
        <p>You have {_.size(props.selectedDevices)} devices selected.</p>

        <Info>
          Select your connector
          , and press the Set connector button to update your selected device(s) with a connector.
        </Info>
        <Select
          name={'setConnectorId'}
          placeholder={props.t('placeholders.selectDevice')}
          options={deviceOptions}
          margin={'0 10px 20px 0'}
          value={_.get(props.formInputs, 'setConnectorId.value')}
          onChange={evt => props.setInputValue('setConnectorId', evt.target.value)}
        />

        <FlexSpaceBetweenWrapper>
          <Button
            content={props.t('labels.cancel')}
            onClick={() => {
              handleExit(props);
            }}
            ghosted
            width={'120px'}
            height={'30px'}
            padding={'0 15px'}
          />
          <Button
            content={props.t('common.setConnector')}
            onClick={handleSetConnector}
            color={'green'}
            width={'200px'}
            height={'30px'}
            padding={'0 15px'}
          />
        </FlexSpaceBetweenWrapper>
      </ContainerBox>
    </CenteredPage>
  );
};

BasicToolsPane.propTypes = {
};

const RawToolsPane = compose(
  withState(formState),
  withEvents(events),
  withRouteCheck,
  withLanguage()
)(BasicToolsPane);

RawToolsPane.propTypes = {
  devices: PropTypes.object
};

RawToolsPane.defaultProps = {};

const ToolsPane = compose(
)(RawToolsPane);

ToolsPane.propTypes = {};

export default ToolsPane;
