import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {
  MdOutlineCheckBox as OwnedIcon,
  MdOutlineIndeterminateCheckBox as NotOwnedIcon,
} from 'react-icons/md';
import {UseMutationResult} from '@tanstack/react-query';

import {formatTimeSinceLastReported, resolveDeviceType} from '../../../utils';
import {createReadableExpectedReportInterval} from '../utils';
import {DecoratedDevice} from '../types';
import {Column, COLUMNS, KNOWN_VALUES} from '../constants';
import {StatusPopup} from '../../status-popup';
import Modal from '../../../components/modal';
import {DeviceName, ValueChip} from '../styled';
import Button from '../../../components/button';
import {FlexWrapper} from '../../../global/styled';
import {COLORS} from '../../../constants';
import DeviceStatusPill from '../../../components/device-status-pill';

import type {ViewColumn} from '../../../types';

interface TableItemProps {
  viewData?: ViewColumn;
  device: DecoratedDevice;
  isInSelectMode: boolean;
  router: NextRouter;
  statusModalDevice?: string;
  setStatusModalDevice: (deviceId: string | undefined) => void;
  activateRuleMutation: UseMutationResult<void, unknown, {ruleId: string, deviceId: string}, unknown>
}

const Name = (props: TableItemProps) => (
  <DeviceName
    onClick={async () => !props.isInSelectMode && await props.router.push(`/devices/${props.device._id}/general-info`)}
  >
    {props.device.name || 'no-name'}
  </DeviceName>
);

const Type = (props: TableItemProps) => (
  <p>
    {props.device && resolveDeviceType(props.device)}
  </p>
);

const Id = (props: TableItemProps) => (
  <p>
    {props.device._id}
  </p>
);

const Status = (props: TableItemProps) => (
  <>
    {props.device.status ? (
      <>
        <DeviceStatusPill
          type={props.device.status.worstStatusType}
          text={_.size(props.device.status.items).toString()}
          onClick={() => props.setStatusModalDevice(props.device._id)}
        />
        <Modal
          isOpen={props.device._id === props.statusModalDevice}
          close={() => props.setStatusModalDevice(undefined)}
          padding={'25px'}
        >
          <StatusPopup
            title={props.device.name}
            deviceStatus={props.device.status}
            onClose={() => props.setStatusModalDevice(undefined)}
          />
        </Modal>
      </>
    ) : (
      <p>-</p>
    )}
  </>
);

const Values = (props: TableItemProps) => (
  <>
    {
      !_.isEmpty(props.device.values)
        ? _.map(props.device.values, value => (<ValueChip key={value}>{value}</ValueChip>))
        : <p>-</p>
    }
  </>
);

const ReportedAt = (props: TableItemProps) => (
  <p>
    {formatTimeSinceLastReported(props.device.reportedAt)}
  </p>
);

const ExpectedReportInterval = (props: TableItemProps) => (
  <p>
    {
      props.device.expectedReportInterval
        ? createReadableExpectedReportInterval(props.device.expectedReportInterval)
        : ''
    }
  </p>
);

const DevEui = (props: TableItemProps) => (
  <p>{props.device.devEui || '-'}</p>
);

const Rssi = (props: TableItemProps) => (
  <p>{props.device.rssi || '-'}</p>
);

const FrameCount = (props: TableItemProps) => (
  <p>{props.device.frameCount || '-'}</p>
);

const FPort = (props: TableItemProps) => (
  <p>{props.device.fPort || '-'}</p>
);

const DataRate = (props: TableItemProps) => (
  <p>{props.device.dataRate || '-'}</p>
);

const SpreadingFactor = (props: TableItemProps) => (
  <p>{props.device.spreadingFactor || '-'}</p>
);

const Owned = (props: TableItemProps) => (
  <>
    {props.device.isCurrentUserOwner ? (
      <OwnedIcon size={18} color='green' />
    ) : (
      <NotOwnedIcon size={18} color='#db3a2e' />
    )}
  </>
);

const DeviceModelName = (props: TableItemProps) => (
  <p>
    {props.device.deviceModelName || '-'}
  </p>
);

const CommandButtons = (props: TableItemProps) => {
  return (
    <FlexWrapper>
      {_.map(props.device.ruleButtons, ruleButton => (
        <Button
          label={ruleButton.name}
          onClick={() => props.activateRuleMutation.mutate({ruleId: ruleButton.ruleId, deviceId: props.device._id})}
          height={'25px'}
          width={'fit'}
          padding={'0 6px'}
          color={'blue'}
          margin={'0 3px 0 0'}
        />
      ))}
    </FlexWrapper>
  );
};

interface Threshold {
  comparison: string;
  value: number;
  color: 'green' | 'red' | 'yellow' | 'blue';
}

const CustomColumn = (props: TableItemProps) => {
  const property = props.viewData?.data?.property;
  const value = property && _.get(props.device, property);

  if (!value) {
    return <>-</>;
  }

  const thresholdColors = {
    green: COLORS.grafanaGreen,
    red: COLORS.grafanaRed,
    yellow: COLORS.grafanaYellow,
    blue: COLORS.grafanaBlue,
  } as const;

  const getThresholdColor = (): string => {
    const thresholds = props.viewData?.data?.threshold;

    const threshold = _.find(thresholds, threshold => {
      if (!_.isNumber(value)) {
        return false;
      }

      if (threshold.comparison === 'gt') {
        return value > threshold.value;
      }
      if (threshold.comparison === 'lt') {
        return value < threshold.value;
      }
      if (threshold.comparison === 'eq') {
        return value === threshold.value;
      }
    }) as Threshold; // LoDash hits wrong type overload

    return thresholdColors[threshold?.color];
  };

  return (
    <ValueChip
      color={getThresholdColor() && COLORS.trueWhite}
      backgroundColor={getThresholdColor()}
      key={props.viewData?._id}
    >
      {value.toString()} {KNOWN_VALUES[property]?.unit}
    </ValueChip>
  );
};

const tableItems: Record<Column, (props: TableItemProps) => JSX.Element> = {
  [COLUMNS.name]: Name,
  [COLUMNS.type]: Type,
  [COLUMNS.id]: Id,
  [COLUMNS.status]: Status,
  [COLUMNS.values]: Values,
  [COLUMNS.expectedReportInterval]: ExpectedReportInterval,
  [COLUMNS.reportedAt]: ReportedAt,
  [COLUMNS.devEui]: DevEui,
  [COLUMNS.rssi]: Rssi,
  [COLUMNS.frameCount]: FrameCount,
  [COLUMNS.fPort]: FPort,
  [COLUMNS.dataRate]: DataRate,
  [COLUMNS.spreadingFactor]: SpreadingFactor,
  [COLUMNS.owned]: Owned,
  [COLUMNS.deviceModelName]: DeviceModelName,
  [COLUMNS.commandButtons]: CommandButtons,
  [COLUMNS.custom]: CustomColumn,
};

export default tableItems;
