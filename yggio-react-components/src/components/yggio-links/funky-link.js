/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// funky-link.js

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {compose} from 'lodash/fp';
import {createSelector} from 'reselect';
import {Link as OrigLink, NavLink as OrigNavLink} from 'react-router-dom';
import {withReselect} from '../../hocs';


import {
  BasicLink,
  BasicNavLink,
  BasicButton,
  BasicNavButton,
} from './basic-styled';


// /////////////
//
// //// the primordial propType, e.g. <Link link={props.link} />
//
// /////////////

const funkyLinkType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    url: PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func,
  }),
]);

// /////////////
//
// //// Select between a button and link
//
// /////////////

const generateBasicFunkyLinkClass = (LinkClass, ButtonClass) => {

  const BasicFunkyLinkClass = props => {
    const linkProps = _.omit(props, ['isFunky', 'onClick', 'label']);
    const buttonProps = _.omit(props, ['isFunky', 'to', 'label']);
    if (!props.isFunky) {
      return (
        <LinkClass {...linkProps}>
          {props.label}
        </LinkClass>
      );
    }
    return (
      <ButtonClass {...buttonProps} content={props.label} />
    );
  };

  BasicFunkyLinkClass.propTypes = {
    name: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    isFunky: PropTypes.bool.isRequired,
    to: PropTypes.string,
    onClick: (props, propName, componentName) => {
      const isValid = !!props.to || _.isFunction(props.onClick);
      return isValid ? null : new Error('Invalid link: props.to or props.onClick must be included');
    },
  };

  return BasicFunkyLinkClass;
};

// /////////////
//
// //// Reselect input props for consistency & flexibility
//
// /////////////

const generateFunkyLinkClass = (LinkClass, ButtonClass) => {

  // ////
  // generate the basic link type
  // ////

  const BasicFunkyLinkClass = generateBasicFunkyLinkClass(LinkClass, ButtonClass);

  // ////
  // create the reselectors
  // ////

  const toSelector = createSelector(
    props => props.to,
    props => _.get(props, 'link.to'),
    (to, linkTo) => to || linkTo || undefined,
  );

  const urlSelector = createSelector(
    props => props.url,
    props => _.get(props, 'link.url'),
    toSelector,
    (url, linkUrl, to) => url || linkUrl || to || undefined,
  );

  const nameSelector = createSelector(
    props => props.name,
    props => _.get(props, 'link.name'),
    urlSelector,
    (name, linkName, url) => name || linkName || url,
  );

  const labelSelector = createSelector(
    props => props.label,
    props => _.get(props, 'link.label'),
    nameSelector,
    (label, linkLabel, name) => label || linkLabel || name,
  );

  const onClickSelector = createSelector(
    props => props.link,
    props => props.onClick,
    props => _.get(props, 'link.onClick'),
    (link, onClick, linkOnClick) => {
      if (_.isFunction(link)) {
        return link;
      }
      return onClick || linkOnClick || undefined;
    },
  );

  const isFunkySelector = createSelector(
    urlSelector,
    url => !url,
  );

  const reselectors = {
    name: nameSelector,
    label: labelSelector,
    isFunky: isFunkySelector,
    to: urlSelector,
    onClick: onClickSelector,
  };

  // ////
  // Create the final composite component
  // ////

  const FunkyLinkClass = compose(
    withReselect(reselectors),
  )(BasicFunkyLinkClass);

  FunkyLinkClass.propTypes = {
    link: funkyLinkType,
    name: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    url: PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func,
  };

  // ////
  // and done
  // ////

  return FunkyLinkClass;
};

// /////////////
//
// //// generate the actual link classes
//
// /////////////

const Link = generateFunkyLinkClass(BasicLink, BasicButton);
const NavLink = generateFunkyLinkClass(BasicNavLink, BasicNavButton);

// /////////////
//
// //// exports
//
// /////////////

export {
  Link,
  NavLink,
  funkyLinkType,
};
