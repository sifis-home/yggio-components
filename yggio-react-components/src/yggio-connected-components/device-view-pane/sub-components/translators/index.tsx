import React, {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {Device, TranslatorPreference} from '../../../../types';
import {devicesApi} from '../../../../api';
import TranslatorsSelector from '../../../translators-selector';
import {TranslatorsSelectorPage} from '../../../translators-selector/types';

interface TranslatorsProps {
  device: Device;
}

const Translators = (props: TranslatorsProps) => {

  const [page, setPage] = useState<TranslatorsSelectorPage>(TranslatorsSelectorPage.list);

  const queryClient = useQueryClient();
  const updateDeviceMutation = devicesApi.useUpdateDevice(queryClient);

  return (
    <>
      <TranslatorsSelector
        deviceModelName={props.device.deviceModelName}
        translatorPreferences={props.device.translatorPreferences || []}
        onTranslatorPreferencesChange={(translatorPreferences: TranslatorPreference[]) => {
          updateDeviceMutation.mutate({
            deviceId: props.device._id,
            updates: {translatorPreferences}
          });
        }}
        currentPage={page}
        onCurrentPageChange={(page: TranslatorsSelectorPage) => setPage(page)}
      />
    </>
  );
};

export default Translators;
