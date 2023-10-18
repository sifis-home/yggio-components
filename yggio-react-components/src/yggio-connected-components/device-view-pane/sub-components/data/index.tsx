import React, {useState} from 'react';
import _ from 'lodash';
import {Code} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';

// Logic
import {DATA_DISPLAY_OPTIONS} from '../../constants';
import {Device} from '../../../../types';
import {Filter, Display} from './types';
import {getFilterOptions, getFilteredDeviceData} from './utils';
import {NO_DATA_TEXT} from './constants';

// UI
import SegmentedControl from '../../../../components/segmented-control';
import DataViewer from '../../../../components/data-viewer';
import {FlexColWrapper, FlexWrapper} from '../../../../global/styled';
import {DataContainer} from './styled';
import {NoDataBox} from '../../styled';

interface DataProps {
  device: Device;
}

const Data = (props: DataProps) => {
  const {t} = useTranslation();

  const [filter, setFilter] = useState<Filter>('all');
  const [display, setDisplay] = useState<Display>('pretty');

  const dataFilterOptions = getFilterOptions(props.device);

  const filteredDeviceData = getFilteredDeviceData(props.device, filter);

  return (
    <FlexColWrapper>
      <FlexWrapper>
        <div>
          {_.size(dataFilterOptions) > 1 && (
            <SegmentedControl
              label={_.capitalize(t('labels.filter'))}
              options={dataFilterOptions}
              value={filter}
              onChange={value => setFilter(value as Filter)}
              margin={'0 14px 0 0'}
            />
          )}
        </div>
        <div>
          <SegmentedControl
            label={_.capitalize(t('labels.display'))}
            options={DATA_DISPLAY_OPTIONS}
            value={display}
            onChange={value => setDisplay(value as Display)}
          />
        </div>
      </FlexWrapper>
      <DataContainer>
        <>
          {!filteredDeviceData && (
            <NoDataBox>
              {NO_DATA_TEXT[filter]}
            </NoDataBox>
          )}
          {filteredDeviceData && display === 'pretty' && (
            <DataViewer data={filteredDeviceData} />
          )}
          {filteredDeviceData && display === 'raw' && (
            <Code fontSize={'0.8rem'} style={{background: 'none'}}>
              <pre>
                {JSON.stringify(filteredDeviceData, null, 2)}
              </pre>
            </Code>
          )}
        </>
      </DataContainer>
    </FlexColWrapper>
  );
};

export default Data;
