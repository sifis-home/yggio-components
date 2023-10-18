/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
