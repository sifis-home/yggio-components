/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons-kit';
import {ic_close as errorIcon} from 'react-icons-kit/md/ic_close';
import {ic_check as successIcon} from 'react-icons-kit/md/ic_check';

import TooltipAnchor from '../tooltip-anchor';
import {
  Wrapper,
  TopContainer,
  Label,
  EnforcementNote,
  BottomContainer,
  IconWrapper,
} from './styled';

const InputDecorator = props => {

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
              margin="0 0 0 6px"
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
              <Icon icon={errorIcon} size={15} />
            </IconWrapper>}
          {!!props.validationSuccessMessage &&
            <IconWrapper>
              <Icon icon={successIcon} size={15} />
            </IconWrapper>}
          {bottomText && (
            <p>{bottomText}</p>
          )}
        </BottomContainer>
      )}

    </Wrapper>
  );
};

InputDecorator.propTypes = {
  label: PropTypes.string,
  isOptional: PropTypes.bool,
  isRequired: PropTypes.bool,
  width: PropTypes.string,
  fullHeight: PropTypes.bool,
  margin: PropTypes.string,
  helperText: PropTypes.string,
  additionalInfo: PropTypes.string,
  validationErrorMessage: PropTypes.string,
  validationSuccessMessage: PropTypes.string,
  children: PropTypes.node,
};

export default InputDecorator;
