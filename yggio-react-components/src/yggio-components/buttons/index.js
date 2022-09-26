/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {
  MapPointerIconButton,
  DeleteIconButton,
  EditIconButton,
  ChevronDownIconButton,
} from './icons';
import Button from '../../components/button';
import {COLORS} from '../../constants';

const baseButtonOptions = {
  width: '120px',
  height: '40px',
  borderRadius: '5px'
};

const SuccessButton = props => {
  const style = {
    color: COLORS.black,
    background: COLORS.greenLight,
    backgroundHover: COLORS.greenLightAlt,
  };
  return (
    <Button
      {...props}
      {...style}
      {...baseButtonOptions}
    />
  );
};

const DangerButton = props => {
  const style = {
    color: COLORS.white,
    background: COLORS.red,
    backgroundHover: COLORS.redAlt,
  };
  return (
    <Button
      {...props}
      {...style}
      {...baseButtonOptions}
    />
  );
};

const RegularButton = props => {
  const style = {
    color: COLORS.white,
    background: COLORS.greyDarkAlt,
    backgroundHover: COLORS.greyDark,
  };
  return (
    <Button
      {...props}
      {...style}
      {...baseButtonOptions}
    />
  );
};

const DarkRegularButton = props => {
  const style = {
    color: COLORS.greyDark,
    background: COLORS.greyDarkAlt,
    backgroundHover: COLORS.greyDarkAlt,
  };
  return (
    <Button
      {...props}
      {...style}
      {...baseButtonOptions}
    />
  );
};

const ControlButton = props => {
  const style = {
    width: '25px',
    height: '25px',
    borderRadius: '3px',
    color: COLORS.white,
    background: COLORS.greenRacing,
    backgroundHover: COLORS.greenMedium,
  };
  return (
    <Button
      {...props}
      {...style}
    />
  );
};

export {
  SuccessButton,
  DangerButton,
  RegularButton,
  DarkRegularButton,
  ControlButton,

  MapPointerIconButton,
  DeleteIconButton,
  EditIconButton,
  ChevronDownIconButton,
};
