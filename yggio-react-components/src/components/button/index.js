/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import Spinner from '../spinner';

import {
  StyledButton,
  resolveTextColor,
} from './styled';
import {DEFAULT_TOOLTIP_PLACEMENT, DEFAULT_ICON_SIZE} from './constants';

const Button = props => {
  const randomId = Math.random().toString(36).slice(-5);
  return (
    <>
      <StyledButton
        data-tip
        data-for={randomId}
        hasStartedLoading={props.hasStartedLoading}
        {...props}
      >
        {props.isLoading && <Spinner color={resolveTextColor(props)} size={18} />}
        {!props.isLoading && (
          <>
            {props.icon && (
              <props.icon
                size={props.iconSize || DEFAULT_ICON_SIZE}
                style={{
                  marginRight: props.iconToLabelGap || 0,
                  order: props.iconPosition === 'right' ? 1 : 0,
                }}
              />
            )}
            {props.label || props.content || props.children}
          </>
        )}
      </StyledButton>
      {!!props.tooltip &&
        <ReactTooltip
          id={randomId}
          place={props.tooltip.placement || DEFAULT_TOOLTIP_PLACEMENT}
          effect="solid"
        >
          {props.tooltip.text}
        </ReactTooltip>}
    </>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  title: PropTypes.string,
  noBorder: PropTypes.bool,
  color: PropTypes.string,
  ghosted: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'full', 'fit']),
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  padding: PropTypes.string,
  tooltip: PropTypes.shape({
    text: PropTypes.string.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
  }),
  style: PropTypes.object,
  icon: PropTypes.object,
  iconSize: PropTypes.number,
  iconPosition: PropTypes.string,
  iconToLabelGap: PropTypes.number,
};

export default Button;
