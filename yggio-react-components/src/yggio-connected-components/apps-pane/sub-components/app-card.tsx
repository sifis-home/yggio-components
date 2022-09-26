/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';

import {App} from '../../../types';
import defaultIcon from '../../../assets/images/picture.svg';
import clientAppIcon from '../../../assets/images/apps/client-app.png';

import Chip from '../../../components/chip';
import {
  AppContainer,
  AppIcon,
  AppInfoContainer,
  AppName,
  AppTagline,
  TagsContainer,
} from '../styled';

interface Props {
  app: App;
  router: NextRouter;
  isClientApp?: boolean;
  shouldLaunchOnClick?: boolean;
}

const AppCard = (props: Props) => {
  const icon = props.app.images?.icon;
  const onClickHandler = async () => {
    if (props.shouldLaunchOnClick) {
      window.open(props.app.url, '_blank');
    } else {
      await props.router.push(`/apps/${props.app.id}`);
    }
  };
  return (
    <AppContainer onClick={onClickHandler}>
      <AppIcon showBackground={!icon && !props.isClientApp}>
        {icon && (
          <img src={icon} alt={''} width={'100%'} />
        )}
        {!icon && props.isClientApp && (
          <img src={clientAppIcon} alt={''} width={'100%'} />
        )}
        {!icon && !props.isClientApp && (
          <img src={defaultIcon} alt={''} width={'50%'} />
        )}
      </AppIcon>
      <AppInfoContainer>
        <AppName>{props.app.name}</AppName>
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
