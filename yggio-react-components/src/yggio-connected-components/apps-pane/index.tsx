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

import {clientAppsApi} from '../../api';
import {selectCategorizedApps, selectFilteredApps} from './selectors';
import {useLocalState} from '../../hooks';
import {withLanguage} from '../../hocs';
import state from './state';
import {APP_TAGS} from '../../constants/apps';

import {CenteredPage} from '../../global/components';
import ContainerBox from '../../components/container-box';
import TextField from '../../components/text-field';
import Select from '../../components/select';
import AppCard from './sub-components/app-card';
import {
  SearchBar,
  HeadingBar,
  Heading,
  SubHeading,
  AppsContainer,
  NoAppsNote,
} from './styled';

interface Props {
  router: NextRouter;
  t(key: string): string;
}

const AppsPane = (props: Props) => {

  const clientAppsQuery = clientAppsApi.useClientAppsQuery();

  const form = useLocalState(state);

  const isFiltering = !!form.formInputs.name.value || !_.isEmpty(form.formInputs.tags.value);

  const categorizedApps = selectCategorizedApps({clientAppsQueryData: clientAppsQuery.data});
  const filteredApps = selectFilteredApps(categorizedApps, form);

  return (
    <CenteredPage maxWidth={'1200px'}>

      <SearchBar>
        <Select
          ariaLabel={_.capitalize(props.t('labels.filterByTags'))}
          options={_.map(APP_TAGS, tag => ({label: tag, value: tag}))}
          isMulti
          isClearable={false}
          placeholder={_.capitalize(props.t('labels.filterByTags'))}
          width={'300px'}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => form.setInputValue('tags', evt.target.value)}
        />
        <TextField
          placeholder={_.capitalize(props.t('labels.filterByName'))}
          ariaLabel={_.capitalize(props.t('labels.filterByName'))}
          width={'200px'}
          value={form.formInputs.name.value as string}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => form.setInputValue('name', evt.target.value)}
          margin={'0 7px 0 0'}
          height={'38px'}
        />
      </SearchBar>

      <HeadingBar>
        <Heading>Yggio Apps</Heading>
        <SubHeading>Apps created by Sensative</SubHeading>
      </HeadingBar>
      <ContainerBox padding={'30px'} margin={'0 0 35px 0'}>
        <AppsContainer>
          {_.map(filteredApps.yggioApps, (app, index) => (
            <AppCard
              key={index}
              app={app}
              router={props.router}
              shouldLaunchOnClick
            />
          ))}
          {isFiltering && _.isEmpty(filteredApps.yggioApps) && (
            <NoAppsNote>No yggio apps found with filter</NoAppsNote>
          )}
        </AppsContainer>
      </ContainerBox>

      <HeadingBar>
        <Heading>Marketplace</Heading>
        <SubHeading>Various third party apps</SubHeading>
      </HeadingBar>
      <ContainerBox padding={'30px'} margin={'0 0 35px 0'}>
        <AppsContainer>
          {_.map(filteredApps.staticApps, (app, index) => (
            <AppCard
              key={index}
              app={app}
              router={props.router}
            />
          ))}
          {isFiltering && _.isEmpty(filteredApps.staticApps) && (
            <NoAppsNote>No static apps found with filter</NoAppsNote>
          )}
        </AppsContainer>
      </ContainerBox>

      <HeadingBar>
        <Heading>Client Apps</Heading>
        <SubHeading>Apps connected to Yggio via OAuth</SubHeading>
      </HeadingBar>
      <ContainerBox padding={'30px'} margin={'0 0 70px 0'}>
        <AppsContainer>
          {_.map(filteredApps.clientApps, (app, index) => (
            <AppCard
              key={index}
              app={app}
              router={props.router}
              isClientApp
              shouldLaunchOnClick
            />
          ))}
          {isFiltering && _.isEmpty(filteredApps.clientApps) && (
            <NoAppsNote>No client apps found with filter</NoAppsNote>
          )}
          {!isFiltering && _.isEmpty(filteredApps.clientApps) && (
            <NoAppsNote>No client apps added yet</NoAppsNote>
          )}
        </AppsContainer>
      </ContainerBox>

    </CenteredPage>
  );
};

export default withLanguage()(AppsPane);
