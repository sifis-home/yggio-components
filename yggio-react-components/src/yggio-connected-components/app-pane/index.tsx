/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import axios from 'axios';
import _ from 'lodash';
import {toast} from 'react-hot-toast';
import {NextRouter} from 'next/router';
import {Flex, Checkbox, Image, Text} from '@chakra-ui/react';
import {accessRights} from 'yggio-core-constants';
import {useQueryClient} from '@tanstack/react-query';
import {confirmAlert} from 'react-confirm-alert';
import {useTranslation} from 'react-i18next';

import {appApi, usersApi, getUserId} from '../../api';
import {selectCategorizedApps} from '../apps-pane/selectors';
import defaultIcon from '../../assets/images/picture.svg';

import {CenteredPage} from '../../global/components';
import {HorizontalLine} from '../../global/styled';
import ContainerBox from '../../components/container-box';
import TextField from '../../components/text-field';
import Spinner from '../../components/spinner';
import Chip from '../../components/chip';
import Button from '../../components/button';
import SoftwareQuality from '../../components/software-quality-viewer';
import {
  NotFoundNote,
  BackLink,
  TopContainer,
  TopMiddleSection,
  TopRightSection,
  AppIcon,
  AppName,
  AppTagline,
  TagsContainer,
  Heading,
  Description,
  ScreenshotsContainer,
  ScreenshotsLeftSection,
  ScreenshotsRightSection,
  MiniScreenshot,
  SelectedScreenshotMarker,
  Email,
} from './styled';

const {ACCESS_SCOPES} = accessRights;

interface Props {
  appId: string;
  router: NextRouter;
}

const AppPane = (props: Props) => {
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const appQuery = appApi.useAppQuery(props.appId);
  const appsCreationMutation = appApi.useCreateApp(queryClient);

  const appsDeletionMutation = appApi.useRemoveApp(queryClient);

  const categorizedApps = selectCategorizedApps({appsQueryData: appQuery.data});

  const [selectedScreenshot, setSelectedScreenshot] = useState(0);

  const allApps = [
    ...categorizedApps.yggioApps,
    ...categorizedApps.staticApps,
    ...categorizedApps.apps,
  ];
  const app = _.find(allApps, ['id', props.appId]);

  if (appsDeletionMutation.isSuccess) {
    void props.router.push('/apps');
    return null;
  }

  if (appsDeletionMutation.isLoading) {
    return (
      <Flex
        justifyContent='center'
        alignItems='center'
        h='80vh'
        w='100%'
      >
        <Text fontSize='lg'>Removing app... </Text><Spinner size={25} />
      </Flex>
    );
  }

  if (!app) {
    return <NotFoundNote>404 - No app found</NotFoundNote>;
  }

  const installApp = async () => {
    if ('type' in app) {
      const data = {
        name: app.name,
        type: app.type,
      };
      await props.router.push('/apps');
      appsCreationMutation.mutate(data);
    }
  };

  const uninstallApp = () => {
    const buttons = [
      {
        label: _.capitalize(t('common.yes')),
        onClick: async () => {
          await appsDeletionMutation.mutateAsync(props.appId)
            .catch(err => {
              if (axios.isAxiosError(err)) {
                toast.error(`${err.response?.status} - ${err.response?.data}`);
              }
            });
        }
      },
      {
        label: _.capitalize(t('common.no')),
        onClick: () => null,
      }
    ];
    confirmAlert({
      title: _.capitalize(t('labels.confirmation')),
      message: 'This action will remove this application from all accounts, are you sure you wish to continue?',
      buttons,
    });
  };

  const screenshots = app.images?.screenshots;
  const [partialAppId] = _.split(props.appId, '-');
  const icon = _.isString(app.images?.icon)
    ? app.images?.icon
    : app.images?.icon?.data;

  return (
    <>
      <CenteredPage maxWidth={'1200px'}>
        <BackLink onClick={async () => props.router.push('/apps')}>&lsaquo; Back to apps</BackLink>
        <ContainerBox padding={'30px 30px 60px 30px'} margin={'0 0 50px 0'}>
          <TopContainer>
            <AppIcon showBackground={!icon}>
              {icon
                ? <Image src={icon} alt={''} boxSize='100px' objectFit='contain' />
                : <img src={defaultIcon} alt={''} width={'50%'} />
              }
            </AppIcon>
            <TopMiddleSection>
              <AppName>{app.name}</AppName>
              <AppTagline>{app.tagline}</AppTagline>
              <TagsContainer>
                {_.map(app.tags, tag => (
                  <Chip
                    text={tag}
                    key={tag}
                    margin={'0 5px 0 0'}
                  />
                ))}
              </TagsContainer>
            </TopMiddleSection>
            <TopRightSection>
              {partialAppId === 'store' && (
                <Button
                  margin='5px'
                  label={'Install'}
                  color={'green'}
                  width={'110px'}
                  onClick={installApp}
                />
              )}
              {partialAppId !== 'store' && (
                <>
                  <Button
                    margin='5px'
                    label={'Launch'}
                    color={'green'}
                    width={'110px'}
                    disabled={!app.url}
                    onClick={() => window.open(app.url, '_blank')}
                  />
                  <Button
                    margin='5px'
                    label={'Edit'}
                    color={'blue'}
                    width={'110px'}
                    disabled={!app.url}
                    onClick={async () => props.router.push(`/apps/${props.appId}/edit`)}
                  />
                  <Button
                    margin='5px'
                    label={'Uninstall'}
                    color={'red'}
                    ghosted
                    height='30px'
                    width={'110px'}
                    onClick={uninstallApp}
                  />
                </>
              )}
            </TopRightSection>
          </TopContainer>
          {!!_.size(screenshots) && (
            <ScreenshotsContainer>
              <ScreenshotsLeftSection>
                <img src={screenshots?.[selectedScreenshot]} alt={app.tagline} width={'100%'} />
              </ScreenshotsLeftSection>
              {_.size(screenshots) > 1 && (
                <ScreenshotsRightSection>
                  {_.map(screenshots, (screenshot, index) => (
                    <MiniScreenshot
                      onClick={() => setSelectedScreenshot(index)}
                      key={index}
                    >
                      {screenshots && (
                        <img src={screenshot} alt={app.tagline} width={'100%'} />
                      )}
                      {index === selectedScreenshot && (
                        <SelectedScreenshotMarker />
                      )}
                    </MiniScreenshot>
                  ))}
                </ScreenshotsRightSection>
              )}
            </ScreenshotsContainer>
          )}
          {(app.metadata && 'softwareQuality' in app.metadata) && (
            <Flex m='20px' h='20px' align='center'>
              <SoftwareQuality quality={app.metadata.softwareQuality} />
              <Text fontSize='14px' fontWeight='bold'>
                Software Quality: {app.metadata.softwareQuality}%
              </Text>
            </Flex>
          )}
          <Description>
            {app.description}
          </Description>
          {app.demoUrl && (
            <>
              <Heading>Demo</Heading>
              <Button
                label={'Try demo'}
                onClick={() => window.open(app.demoUrl, '_blank')!.focus()}
              />
            </>
          )}
          {app.support && (
            <>
              <Heading>Support</Heading>
              <Email>{app.support}</Email>
            </>
          )}
        </ContainerBox>
      </CenteredPage>
      {('withAccess' in app && app.withAccess) && (
        <CenteredPage maxWidth='1200px'>
          <ContainerBox padding={'30px 30px 60px 30px'} margin={'0 0 50px 0'}>
            <AppAccessPane appId={props.appId} />
          </ContainerBox>
        </CenteredPage>
      )}
    </>
  );
};

interface AppAccessProps {
  appId: string;
}

const AppAccessPane = (props: AppAccessProps) => {
  const [username, setUsername] = React.useState('');
  const userQuery = usersApi.useGetUser({
    username,
  });
  const queryClient = useQueryClient();
  const appAccessQuery = appApi.useAppResourceAccessQuery({resourceId: props.appId});
  const createAppAccessMutation = appApi.useCreateAppAccess(queryClient);
  const removeAppAccessMutation = appApi.useRemoveAppAccess(queryClient);

  const userId = getUserId();

  const [myAccessData] = _.filter(appAccessQuery.data, data => data.userId === userId);
  const publicAccessData = _.filter(appAccessQuery.data, data => data.userId !== userId);
  const accessUserIds = _.map(publicAccessData, 'userId');
  const soughtUsersQuery = usersApi.useSeekUsersQuery(accessUserIds);
  const initial: Record<string, string> = {};
  const idKeyedUsernames = _.reduce(soughtUsersQuery.data, (acc, curr) => {
    acc[curr._id] = curr.username;
    return acc;
  }, initial);

  if (appAccessQuery.isLoading) {
    return <Flex w='100%' justifyContent='center'><Spinner size={26} /></Flex>;
  }

  if (_.isEmpty(publicAccessData) && _.isEmpty(myAccessData)) {
    return <Flex w='100%' justifyContent='center'>No access rights found.</Flex>;
  }

  const handleAppAccess = ({
    scope,
    userId,
    isChecked,
  }: {scope: string, userId?: string, isChecked: boolean}) => {
    const updates = {
      scopes: [scope],
      userId,
    };
    if (isChecked) {
      removeAppAccessMutation.mutate({appId: props.appId, updates});
    } else {
      createAppAccessMutation.mutate({appId: props.appId, updates});
    }
  };

  return (
    <Flex flexDir='column'>
      <Flex
        w='400px'
        h='25px'
        m='5px'
      >
        Your access rights to this app:
        <>
          {_.map(myAccessData?.scope.sort(), scope => <Chip key={scope} margin='3px' color='blue' text={scope} />)}
        </>
      </Flex>
      <HorizontalLine />
      <Flex
        w='600px'
        h='25px'
        m='10px'
        alignItems='center'
      >
        <TextField
          width='400px'
          name='username'
          placeholder='Enter the username of the user you want to grant access to'
          value={username}
          onChange={evt => setUsername(evt.target.value)}
        />
        <Button
          disabled={!userQuery.isSuccess}
          color='green'
          label='Grant access'
          onClick={() => {
            handleAppAccess({scope: 'read', userId: userQuery.data?._id, isChecked: false});
            setUsername('');
          }}
          margin='5px'
        />
      </Flex>
      {_.isEmpty(publicAccessData) && (
        <Text m='15px 0 0' fontSize='sm'>No users with access rights available, you can add a user in the input above.</Text>
      )}
      {!_.isEmpty(publicAccessData) && (
        <>
          <Flex
            w='450px'
            border='1px solid lightgrey'
            background='#f5f5f5'
          >
            <Flex
              w='100px'
              h='25px'
              m='5px'
              justifyContent='center'
              alignItems='center'
            >
              User
            </Flex>
            {_.map(ACCESS_SCOPES, scope => (
              <Flex
                w='100px'
                h='25px'
                m='5px'
                justifyContent='center'
                alignItems='center'
                key={scope}
              >
                {_.capitalize(scope)}
              </Flex>
            ))}
          </Flex>

          <Flex
            flexDir='column'
            h='300px'
            w='470px'
            overflowY='scroll'
            borderBottom='1px solid lightgrey'
          >
            {_.map(_.sortBy(publicAccessData, 'userId'), access => {
              const initial: Record<string, boolean> = {};
              const accessScopes = _.reduce(ACCESS_SCOPES, (acc, curr) => {
                const accessScope = _.find(access.scope, scope => scope === curr);
                acc[curr] = !!accessScope;
                return acc;
              }, initial);

              return (
                <Flex borderBottom='1px solid lightgrey' w='450px' key={access.userId}>
                  <Flex
                    w='100px'
                    h='25px'
                    m='5px'
                    justifyContent='center'
                    alignItems='center'
                  >
                    {idKeyedUsernames[access.userId]}
                  </Flex>
                  {_.map(accessScopes, (scope, key) => (
                    <Flex
                      key={key}
                      w='100px'
                      h='25px'
                      m='5px'
                      justifyContent='center'
                    >
                      <Checkbox
                        colorScheme='green'
                        isChecked={!!scope}
                        onChange={() => handleAppAccess({scope: key, userId: access.userId, isChecked: scope})}
                      />
                    </Flex>
                  ))}
                </Flex>
              );
            })}
          </Flex>
        </>
      )}
    </Flex>

  );
};

export default AppPane;
