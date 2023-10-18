import _ from 'lodash';
import {confirmAlert} from 'react-confirm-alert';
import {NextRouter} from 'next/router';
import {UseMutationResult} from '@tanstack/react-query';

import {Translate} from '../../../../types';

interface HandleDeleteDeviceParams {
  deviceId: string;
  isMountedInRec: boolean;
  t: Translate;
  router: NextRouter;
  removeDeviceMutation: UseMutationResult<unknown, unknown, {deviceId: string}, unknown>;
}

const handleDeleteDevice = (params: HandleDeleteDeviceParams) => {

  if (params.isMountedInRec) {

    const buttons = [
      {
        label: 'Ok',
        onClick: () => null,
      },
    ];
    confirmAlert({
      title: 'Unable to delete device',
      message: 'You need to dismount the device in Real Estate Core before you can delete the device',
      buttons,
    });

  } else {

    const buttons = [
      {
        label: _.capitalize(params.t('common.yes')),
        onClick: async () => {
          params.removeDeviceMutation.mutate({deviceId: params.deviceId});
          await params.router.push('/devices');
        }
      },
      {
        label: _.capitalize(params.t('common.no')),
        onClick: () => null,
      }
    ];
    confirmAlert({
      title: _.capitalize(params.t('labels.confirmation')),
      message: params.t('phrases.deleteDeviceVerification'),
      buttons,
    });

  }

};

export {
  handleDeleteDevice,
};
