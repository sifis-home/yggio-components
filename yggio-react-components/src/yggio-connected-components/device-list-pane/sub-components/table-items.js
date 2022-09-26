/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {checkCircle} from 'react-icons-kit/fa/checkCircle';

import {formatTimeSinceLastReported, resolveDeviceType} from '../../../utils';
import {StatusPopup} from './status-popup';
import {Modal} from '../../../components/modal';
import {
  SmallStatusChip,
  StatusChipIcon,
} from '../../styled';
import {
  DeviceName,
  ValueChip,
  AccessRightIcon,
} from '../styled';
import {createReadableExpectedReportInterval} from '../utils';
import {FlexWrapper} from '../../../global/styled';
import Button from '../../../components/button';
import {RELEVANT_VALUES, RULES_ACTIONS} from '../../../constants';

const Name = props => (
  <DeviceName
    onClick={() => !props.selectMode && props.router.push(`/devices/${props.device._id}/general-info`)}
  >
    {props.device.name || 'no-name'}
  </DeviceName>
);

const Type = props => (
  <p>
    {_.get(props, 'device') && resolveDeviceType(_.get(props, 'device'))}
  </p>
);

const Id = props => (
  <p>
    {props.device._id}
  </p>
);

const Status = props => (
  <>
    {!_.isEmpty(props.device.status?.items) ? (
      <>
        <SmallStatusChip
          type={props.device.status.worstStatusType}
          onClick={() => props.openStatusModal(props.device._id)}
        >
          <StatusChipIcon type={props.device.status.worstStatusType} />
          {_.size(props.device.status.items)}
        </SmallStatusChip>
        <Modal
          isOpen={props.device._id === props.deviceWithOpenStatusModal}
          close={props.closeStatusModal}
          padding={'25px'}
        >
          <StatusPopup
            title={props.device.name}
            items={props.device.status.items}
            onClose={props.closeStatusModal}
          />
        </Modal>
      </>
    ) : (
      <p>-</p>
    )}
  </>
);

const Values = props => (
  <>
    {
      !_.isEmpty(props.device.values)
        ? _.map(props.device.values, value => (<ValueChip key={value}>{value}</ValueChip>))
        : <p>-</p>
    }
  </>
);

const ReportedAt = props => (
  <p>
    {formatTimeSinceLastReported(props.device.reportedAt)}
  </p>
);

const ExpectedReportInterval = props => (
  <p>
    {
      props.device.expectedReportInterval
        ? createReadableExpectedReportInterval(props.device.expectedReportInterval)
        : ''
    }
  </p>
);

const DevEui = props => (
  <p>{RELEVANT_VALUES.lora.devEui.getValue(props.device) || '-'}</p>
);

const Rssi = props => (
  <p>{RELEVANT_VALUES.lora.rssi.getValue(props.device) || '-'}</p>
);

const FrameCount = props => (
  <p>{RELEVANT_VALUES.lora.frameCount.getValue(props.device) || '-'}</p>
);

const FPort = props => (
  <p>{RELEVANT_VALUES.lora.fPort.getValue(props.device) || '-'}</p>
);

const DataRate = props => (
  <p>{RELEVANT_VALUES.lora.dataRate.getValue(props.device) || '-'}</p>
);

const SpreadingFactor = props => (
  <p>{RELEVANT_VALUES.lora.spreadingFactor.getValue(props.device) || '-'}</p>
);

const Owned = props => (
  <>
    <AccessRightIcon
      hasRight={_.includes(
        _.get(props.accessRights, `data.${_.get(props, 'device._id')}.scope`),
        'admin'
      )}
      icon={checkCircle}
    />
  </>
);

const Actions = props => {
  return _.map(props.rules, (rule, ruleId) => {
    const [ruleName, deviceId] = _.split(rule.name, '.');
    if (_.get(props, 'device._id') === deviceId) {
      return (
        <FlexWrapper key={ruleId}>
          <Button
            style={{padding: '0 15px 0', fontSize: '0.8em'}}
            color={'green'}
            margin={'2px'}
            height={'20px'}
            width={'20px'}
            content={RULES_ACTIONS[ruleName]}
            onClick={() => {
              props.activateRuleAction(ruleId);
            }}
          />
        </FlexWrapper>
      );
    }
  });
};

export default {
  Name,
  Type,
  Id,
  Status,
  Values,
  ExpectedReportInterval,
  ReportedAt,
  DevEui,
  Rssi,
  FrameCount,
  FPort,
  DataRate,
  SpreadingFactor,
  Owned,
  Actions,
};
