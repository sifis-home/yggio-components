/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {confirmAlert} from 'react-confirm-alert';

const showNameConflicPromt = (name: string) => {
  confirmAlert({
    title: 'Name conflict',
    message: `There already exists a parameter with name: "${name}"`,
    buttons: [{label: 'Ok', onClick: () => null}]
  });
};

const showRemovePromt = (name: string, performRemove: () => void) => {
  const buttons = [
    {
      label: 'Yes',
      onClick: () => performRemove(),
    },
    {
      label: 'No',
      onClick: () => null,
    }
  ];
  confirmAlert({
    title: 'Remove contextual parameter?',
    message: `Are you sure you want the remove: "${name}"?`,
    buttons,
  });
};

export {
  showNameConflicPromt,
  showRemovePromt,
};
