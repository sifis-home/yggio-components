/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useState} from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';

import {clientAppsApi} from '../../api';
import {selectCategorizedApps} from '../apps-pane/selectors';
import defaultIcon from '../../assets/images/picture.svg';

import {CenteredPage} from '../../global/components';
import ContainerBox from '../../components/container-box';
import Chip from '../../components/chip';
import Button from '../../components/button';
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

interface Props {
  appId: string;
  router: NextRouter;
}

const AppPane = (props: Props) => {

  const clientAppsQuery = clientAppsApi.useClientAppsQuery();

  const categorizedApps = selectCategorizedApps({clientAppsQueryData: clientAppsQuery.data});

  const [selectedScreenshot, setSelectedScreenshot] = useState(0);

  const allApps = [
    ...categorizedApps.yggioApps,
    ...categorizedApps.staticApps,
    ...categorizedApps.clientApps
  ];
  const app = _.find(allApps, ['id', props.appId]);

  if (!app) {
    return <NotFoundNote>404 - No app found</NotFoundNote>;
  }

  const screenshots = app.images?.screenshots;

  return (
    <CenteredPage maxWidth={'1200px'}>
      <BackLink onClick={async () => props.router.push('/apps')}>&lsaquo; Back to apps</BackLink>
      <ContainerBox padding={'30px 30px 60px 30px'} margin={'0 0 50px 0'}>
        <TopContainer>
          <AppIcon showBackground={!app.images?.icon}>
            {app.images?.icon ? (
              <img src={app.images?.icon} alt={''} width={'100%'} />
            ) : (
              <img src={defaultIcon} alt={''} width={'50%'} />
            )}
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
            <Button
              label={'Launch'}
              color={'green'}
              width={'110px'}
              disabled={!app.url}
              onClick={() => window.open(app.url, '_blank')}
            />
          </TopRightSection>
        </TopContainer>
        {!!_.size(screenshots) && (
          <ScreenshotsContainer>
            <ScreenshotsLeftSection>
              <img src={screenshots![selectedScreenshot]} alt={app.tagline} width={'100%'} />
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
  );
};

export default AppPane;
