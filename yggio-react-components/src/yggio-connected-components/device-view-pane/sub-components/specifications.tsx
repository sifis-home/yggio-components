/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';

import {Device, Translate} from '../../../types';
import {
  InfoItem,
  InfoItemTop,
  InfoItemTitle,
  InfoItemMiddle,
  SpecSection,
  SpecHeading,
  NoDataBox,
} from '../styled';
import {selectSpecifications} from '../selectors';

type Specifications = Record<string, Record<string, string | undefined>>;

interface SpecificationsProps {
  device: Device;
  t: Translate;
}

const Specifications = (props: SpecificationsProps) => {

  const specifications = selectSpecifications({device: props.device, t: props.t}) as Specifications;

  if (_.size(specifications) === 0) {
    return (
      <NoDataBox>The device has no specifications</NoDataBox>
    );
  }
  return (
    <>
      {_.map(specifications, (items, sectionName) => (
        <SpecSection key={sectionName}>
          <SpecHeading><p>{sectionName}</p></SpecHeading>
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
        </SpecSection>
      ))}
    </>
  );
};

export default Specifications;
