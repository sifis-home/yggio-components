import _ from 'lodash';
import {compose} from 'lodash/fp';

import {Device, Translate, IdKeyedCalculations} from '../types';
import {STATUS_TYPES} from '../constants';
import {StatusTypeNames, StatusType} from '../constants/status-types';

interface Item {
  text: string;
  type: StatusTypeNames;
}

type Items = Item[];

interface DeviceStatus {
  worstStatusType: StatusTypeNames;
  items: Items;
}

interface CheckFunctionsProps {
  device: Device;
  items: Items;
  calculations?: IdKeyedCalculations;
  t: Translate;
}

const checkExpectedReportIntervalStatus = (props: CheckFunctionsProps) => {
  if (props.device.expectedReportInterval && props.device.reportedAt) {
    const currentDate = Date.now();
    const reportedAtTime = new Date(props.device.reportedAt).getTime();
    const reportTime = (currentDate - props.device.expectedReportInterval);
    const hasNotReportedInTime = reportTime > reportedAtTime;
    if (hasNotReportedInTime) {
      props.items.push({
        text: props.t('deviceStatus.deviceDidNotReportInTime'),
        type: StatusTypeNames.warning,
      });
    }
  }

  return props;
};

const checkCalculatedDeviceStatus = (props: CheckFunctionsProps) => {
  const isCalculatedDevice = _.find(props.calculations, calculation => {
    return _.get(calculation, 'destination.mongoId') === props.device._id;
  });
  if (isCalculatedDevice) {
    props.items.push({type: StatusTypeNames.info, text: props.t('deviceStatus.calculated')});
  }

  return props;
};

const checkConnectorStatus = (props: CheckFunctionsProps) => {
  const isConnector = !!props.device.downlinkQueue;
  const shouldHaveConnector = _.some([props.device.tag, props.device.devEui, _.get(props.device, 'nodeInfo.nodeId'), props.device.gatewayEui]) && !isConnector;
  if (props.device.connector && !_.isEmpty(props.device.connector)) {
    props.items.push({
      type: StatusTypeNames.ok,
      text: `${props.t('deviceStatus.connectedTo')}: ${_.get(props.device, 'connector.name', 'unknown')}`
    });

    if (props.device.vid && props.device.pid) {
      const level = _.get(props.device, 'nodeInfo.commandClasses.0x0080.battery.level');
      if (level) {
        const levelText = level === '255' ? 'LOW' : `${level}%`;
        switch (true) {
          case (level <= 10):
            props.items.push({type: StatusTypeNames.error, text: `${props.t('deviceStatus.battery')}:  ${levelText}`});
            break;
          case (level < 30 && level > 10):
            props.items.push({type: StatusTypeNames.warning, text: `${props.t('deviceStatus.battery')}:  ${levelText}`});
            break;
          case (level <= 100 && level >= 30):
            props.items.push({type: StatusTypeNames.ok, text: `${props.t('deviceStatus.battery')}:  ${levelText}`});
            break;
          case (level === '255'):
            props.items.push({type: StatusTypeNames.error, text: props.t('deviceStatus.battery')});
            break;
          default:
            break;
        }
      }
    }
  } else if (shouldHaveConnector) {
    props.items.push({type: StatusTypeNames.error, text: props.t('deviceStatus.noConnectorSet')});
  }

  if (!props.device.synchronizedAt && (shouldHaveConnector || isConnector)) {
    props.items.push({type: StatusTypeNames.warning, text: props.t('deviceStatus.notSynchronizedWithIntegration')});
  }

  if (isConnector) {
    props.items.push({
      type: StatusTypeNames.ok,
      text: `${props.t('deviceStatus.connectedToIntegration')}: ${props.device.downlinkQueue}`
    });
  }

  return props;
};

const checkRSSIStatus = (props: CheckFunctionsProps) => {
  if (props.device.devEui) {
    const signalStrength = Number(props.device.rssi) + Number(props.device.snr || 0);
    if (Number.isNaN(signalStrength)) {
      props.items.push({type: StatusTypeNames.warning, text: props.t('deviceStatus.signalUnknown')});
    } else {
      const strongSignal = signalStrength > -110;
      if (strongSignal) {
        props.items.push({type: StatusTypeNames.ok, text: props.t('deviceStatus.signalStrong')});
      } else {
        props.items.push({type: StatusTypeNames.warning, text: props.t('deviceStatus.signalWeak')});
      }
    }
  }

  return props;
};

const checkCoAPStatus = (props: CheckFunctionsProps) => {
  if (props.device.resourceName) { // coap
    if (props.device.acknowledged) {
      props.items.push({type: StatusTypeNames.ok, text: props.t('deviceStatus.acknowledgedByCoaP')});
    } else {
      props.items.push({type: StatusTypeNames.error, text: props.t('deviceStatus.notAcknowledgedByCoaP')});
    }
  }

  return props;
};

const checkValueStatus = (props: CheckFunctionsProps) => {
  const digital2 = _.get(props.device, 'value.digital2') as string;
  if (_.eq(digital2, 0)) {
    props.items.push({type: StatusTypeNames.ok, text: props.t('deviceStatus.waterLevelOK')});
  }

  if (_.eq(digital2, 1)) {
    props.items.push({type: StatusTypeNames.error, text: props.t('deviceStatus.waterLevelCritical')});
  }

  const occupancy = _.get(props.device, 'value.occupancy') as string;
  if (_.eq(occupancy, 0)) {
    props.items.push({type: StatusTypeNames.ok, text: props.t('deviceStatus.notOccupied')});
  }

  if (_.eq(occupancy, 1)) {
    props.items.push({type: StatusTypeNames.warning, text: props.t('deviceStatus.occupied')});
  }

  if (_.eq(occupancy, 2)) {
    props.items.push({type: StatusTypeNames.error, text: props.t('deviceStatus.occupied')});
  }

  if (_.lte(occupancy, 75)) {
    props.items.push({type: StatusTypeNames.ok, text: 'OK'});
  }

  const presence = _.get(props.device, 'value.presence.value');
  if (presence) {
    props.items.push({type: StatusTypeNames.error, text: props.t('deviceStatus.occupied')});
  }

  const floodValue = _.get(props.device, 'value.flood.value');
  if (_.gt(floodValue, 75)) {
    props.items.push({type: StatusTypeNames.error, text: props.t('deviceStatus.flooded')});
  }

  return props;
};

const getDeviceStatus = (t: Translate, device?: Device, calculations?: IdKeyedCalculations) => {
  const items: Items = [];

  if (!device) {
    return undefined;
  }

  const result = compose(
    checkValueStatus,
    checkCoAPStatus,
    checkRSSIStatus,
    checkConnectorStatus,
    checkCalculatedDeviceStatus,
    checkExpectedReportIntervalStatus,
  )({device, calculations, t, items});

  if (_.isEmpty(result.items)) {
    return undefined;
  }

  const acc: StatusType = STATUS_TYPES[StatusTypeNames.info];
  const worstStatus = _.reduce(result.items, (result, item) => {
    if (STATUS_TYPES[item.type].severity > result.severity) {
      return STATUS_TYPES[item.type];
    }
    return result;
  }, acc);

  return {
    worstStatusType: worstStatus.name,
    items: result.items,
  };
};

export default getDeviceStatus;
export type {
  DeviceStatus,
};
