/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {Image, Flex} from '@chakra-ui/react';


import defaultIcon from '../../../assets/images/picture.svg';
import clientAppIcon from '../../../assets/images/apps/client-app.png';

import Chip from '../../../components/chip';
import SoftwareQuality from '../../../components/software-quality-viewer';
import {
  AppContainer,
  AppIcon,
  AppInfoContainer,
  AppName,
  AppTagline,
  TagsContainer,
} from '../styled';
import type {AppUnion} from '../types';

interface Props {
  app: AppUnion;
  router: NextRouter;
  isClientApp?: boolean;
  shouldLaunchOnClick?: boolean;
}

const AppCard = (props: Props) => {
  const icon = (props.app.images?.icon?.data || props.app.images?.icon) as string;
  const onClickHandler = async () => {
    if (props.shouldLaunchOnClick) {
      return window.open(props.app.url, '_blank');
    }
    await props.router.push(`/apps/${props.app.id || props.app._id}`);
  };
  return (
    <AppContainer onClick={onClickHandler}>
      <AppIcon showBackground={!icon && !props.isClientApp}>
        {icon && (
          <Image src={icon} alt={''} boxSize='80px' objectFit='contain' />
        )}
        {!icon && props.isClientApp && (
          <img src={clientAppIcon} alt={''} width={'100%'} />
        )}
        {!icon && !props.isClientApp && (
          <img src={defaultIcon} alt={''} width={'50%'} />
        )}
      </AppIcon>
      <AppInfoContainer>
        <Flex h='25px' align='center'>
          <AppName>
            {props.app.name}
          </AppName>
          {props.app.metadata?.softwareQuality && (
            <SoftwareQuality quality={props.app.metadata.softwareQuality} />
          )}
        </Flex>
        <AppTagline>{props.app.tagline}</AppTagline>
        <TagsContainer>
          {_.map(props.app.tags, tag => (
            <Chip
              text={tag}
              key={tag}
              margin={'0 5px 0 0'}
            />
          ))}
        </TagsContainer>
      </AppInfoContainer>
    </AppContainer>
  );
};

export default AppCard;
