import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {Button, Flex, Box} from '@chakra-ui/react';
import {APP_TYPES} from 'yggio-core-constants';
import {useQueryClient} from '@tanstack/react-query';

import defaultIcon from '../../../assets/images/picture.svg';
import clientAppIcon from '../../../assets/images/apps/client-app.png';
import {appApi} from '../../../api';
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

import type {App} from '../types';

interface Props {
  app: App;
  router: NextRouter;
  isClientApp?: boolean;
}

const AppCard = (props: Props) => {
  const queryClient = useQueryClient();
  const appQuery = appApi.useAppsQuery({
    matchPattern: {name: props.app.name}
  });
  const icon = props.app.images?.icon;
  const onClickHandler = async () => {
    /*
     * TODO: Fix app-pane to support app store apps in a future patch
     * await props.router.push(`/apps/${props.app._id}`);
    */
  };

  const appsCreationMutation = appApi.useCreateApp(queryClient);
  const appsDeletionMutation = appApi.useRemoveApp(queryClient);

  const installApp = () => {
    const isSifisHome = props.app.metadata.owner.login === 'sifis-home';
    const app = {
      name: props.app.name,
      description: props.app.description,
      images: props.app.images,
      type: props.app.type || (isSifisHome && APP_TYPES.sifisHome) || APP_TYPES.app,
      tags: props.app.tags,
      tagline: props.app.tagline,
      metadata: props.app.metadata,
      url: props.app.url,
    };
    appsCreationMutation.mutate(app);
  };

  const removeApp = () => {
    const [app] = appQuery.data?.items || [];
    appsDeletionMutation.mutate(app._id);
  };

  const onClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    if (_.isEmpty(appQuery.data?.items)) {
      installApp();
    } else {
      removeApp();
    }
  };

  return (
    <AppContainer onClick={onClickHandler}>
      <AppIcon showBackground={!icon && !props.isClientApp}>
        {icon && (
          <img src={icon.data} alt={''} width={'100%'} />
        )}
        {!icon && props.isClientApp && (
          <img src={clientAppIcon} alt={''} width={'100%'} />
        )}
        {!icon && !props.isClientApp && (
          <img src={defaultIcon} alt={''} width={'50%'} />
        )}
      </AppIcon>
      <AppInfoContainer>
        <Flex justifyContent='space-between'>
          <Box>
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
          </Box>
          <Button
            pos='absolute'
            right='0'
            h='25px'
            colorScheme='blue'
            onClick={onClick}
            title={`Click to ${_.isEmpty(appQuery.data?.items) ? 'Install' : 'Uninstall'} this app`}
          >
            {_.isEmpty(appQuery.data?.items) ? 'Install' : 'Uninstall'}
          </Button>
        </Flex>
      </AppInfoContainer>
    </AppContainer>
  );
};

export default AppCard;
