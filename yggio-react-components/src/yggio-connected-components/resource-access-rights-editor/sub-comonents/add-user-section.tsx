/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {usersApi} from '../../../api';
import {getValidationErrorMessage} from '../selectors';
import {ScopeItem} from '../../../types';
import TextField from '../../../components/text-field';
import Button from '../../../components/button';
import {ACCESS_RIGHT_TYPES} from '../constants';
import {AddUserContainer} from '../styled';

interface AddUserSectionProps {
  accessUserIds: string[];
  createAccessRight: (userId: string, scope: ScopeItem[]) => void;
}

const AddUserSection = (props: AddUserSectionProps) => {

  const {t} = useTranslation();

  const [username, setUsername] = useState<string>('');

  // TODO: Maybe we should debounce this?
  const userQuery = usersApi.useGetUser({username});

  const validationErrorMessage = getValidationErrorMessage({username, userQuery, accessUserIds: props.accessUserIds});

  return (
    <AddUserContainer>
      <TextField
        label={t('phrases.enterAccessUser')}
        placeholder={`${t('labels.username')}...`}
        value={username}
        onChange={evt => setUsername(evt.target.value)}
        validationErrorMessage={validationErrorMessage}
        validationSuccessMessage={!validationErrorMessage && !userQuery.isFetching && username ? 'User found' : null}
        fullHeight
      />
      <Button
        label={t('labels.addUser')}
        margin={'0 0 13px 8px'}
        color='blue'
        height={'35px'}
        isLoading={userQuery.isFetching}
        disabled={!userQuery.data}
        onClick={() => {
          const user = userQuery.data;
          if (user) {
            props.createAccessRight(
              user._id,
              [ACCESS_RIGHT_TYPES.read],
            );
            setUsername('');
          }
        }}
      />
    </AddUserContainer>
  );
};

export default AddUserSection;
