import React from 'react';
import _ from 'lodash';

// Logic
import {Device} from '../../../../types';
import {getSpecifications} from './utils';

// UI
import {
  InfoItem,
  InfoItemTop,
  InfoItemTitle,
  InfoItemMiddle,
  NoDataBox,
} from '../../styled';
import {
  Section,
  Heading,
} from './styled';

interface SpecificationsProps {
  device: Device;
}

const Specifications = (props: SpecificationsProps) => {

  const specifications = getSpecifications(props.device);

  if (_.size(specifications) === 0) {
    return (
      <NoDataBox>The device has no specifications</NoDataBox>
    );
  }
  return (
    <>
      {_.map(specifications, (items, sectionName) => (
        <Section key={sectionName}>
          <Heading><p>{sectionName}</p></Heading>
          {_.map(items, (itemValue, itemKey) => (
            <InfoItem key={itemKey}>
              <InfoItemTop>
                <InfoItemTitle>{itemKey}</InfoItemTitle>
              </InfoItemTop>
              <InfoItemMiddle>
                <p>{itemValue || '-'}</p>
              </InfoItemMiddle>
            </InfoItem>
          ))}
        </Section>
      ))}
    </>
  );
};

export default Specifications;
