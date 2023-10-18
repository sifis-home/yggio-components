/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import {
  MdCheck as SuccessIcon,
  MdClose as ErrorIcon,
} from 'react-icons/md';

import type {InputDecoratorProps} from './types';
import TooltipAnchor from '../tooltip-anchor';
import {
  Wrapper,
  TopContainer,
  Label,
  EnforcementNote,
  BottomContainer,
  IconWrapper,
} from './styled';

const InputDecorator = (props: InputDecoratorProps) => {

  const required = props.isRequired && '*required';
  const optional = props.isOptional && '(optional)';
  const enforcementText = required || optional;

  const bottomText = props.validationErrorMessage ||
    props.validationSuccessMessage ||
    props.helperText;

  const shouldShowBottomPart = !!props.validationErrorMessage ||
    !!props.validationSuccessMessage ||
    props.fullHeight;

  const errorTextColor = props.validationErrorMessage && '#fa3939';
  const successTextColor = props.validationSuccessMessage && 'green';
  const bottomTextColor = errorTextColor || successTextColor || '#777';

  return (
    <Wrapper
      margin={props.margin}
      width={props.width}
    >
      {!!props.label &&
        <TopContainer>
          {!!props.label && (
            <Label>
              {props.label}
            </Label>
          )}
          {!!props.additionalInfo && (
            <TooltipAnchor
              text={props.additionalInfo}
              id={props.label}
              tooltipPlacement="right"
              margin="0 0 0 4px"
            />
          )}
          {!!enforcementText && (
            <EnforcementNote>
              {enforcementText}
            </EnforcementNote>
          )}
        </TopContainer>}
      {props.children}
      {shouldShowBottomPart && (
        <BottomContainer color={bottomTextColor}>
          {!!props.validationErrorMessage &&
            <IconWrapper>
              <ErrorIcon size={15} />
            </IconWrapper>}
          {!!props.validationSuccessMessage &&
            <IconWrapper>
              <SuccessIcon size={15} />
            </IconWrapper>}
          {bottomText && (
            <p>{bottomText}</p>
          )}
        </BottomContainer>
      )}

    </Wrapper>
  );
};

export default InputDecorator;
